# Instruções de Implementação do Cloudflare Turnstile

Este documento serve como guia para implementar a validação do **Cloudflare Turnstile** no seu Backend (Payload CMS) e no seu Proxy (Cloudflare Worker).

A validação correta impede que requisições falsas cheguem ao seu banco de dados ou serviço de e-mail.

---

## ⚠️ Pré-requisitos Importantes

1.  **Chaves:** Você precisa de duas chaves do painel do Cloudflare:
    *   **Site Key (Pública):** Usada no Frontend (Adicione no `.env` do frontend como `VITE_TURNSTILE_SITE_KEY`).
    *   **Secret Key (Privada):** Usada no Backend/Worker (NUNCA exponha no frontend).

2.  **Frontend:** O frontend já foi atualizado para enviar o campo `token` junto com `name`, `email` e `message`.

---

## Opção 1: Validação no Cloudflare Worker (Recomendado)

Validar no Worker é mais eficiente pois bloqueia o ataque na borda (Edge), antes de consumir recursos do seu servidor backend.

Adicione este código ao seu script do Worker (arquivo `index.js` ou `src/index.ts` do seu worker):

```javascript
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Interceptar apenas a rota de contato (POST)
    if (url.pathname.includes("/api/contact") && request.method === "POST") {
      
      // Clonar a requisição para ler o corpo sem consumi-la totalmente
      const clone = request.clone();
      const body = await clone.json();
      const token = body.token;
      const clientIP = request.headers.get("CF-Connecting-IP");

      if (!token) {
        return new Response(JSON.stringify({ message: "Token de captcha ausente." }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }

      // 2. Validar o token com a API do Cloudflare
      const formData = new FormData();
      formData.append('secret', env.TURNSTILE_SECRET_KEY); // Configure esta env no painel do Cloudflare
      formData.append('response', token);
      formData.append('remoteip', clientIP);

      const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        body: formData,
        method: 'POST',
      });

      const outcome = await result.json();

      if (!outcome.success) {
        return new Response(JSON.stringify({ message: "Falha na validação do Captcha." }), {
          status: 403,
          headers: { "Content-Type": "application/json" }
        });
      }
      
      // Se passou, a requisição original segue para o backend
    }

    return fetch(request);
  }
};
```

---

## Opção 2: Validação no Payload CMS (Backend)

Se preferir validar diretamente no Payload CMS (Node.js), você deve alterar o seu endpoint customizado `/api/contact`.

No arquivo onde você define o endpoint (ex: `src/collections/Contact.ts` ou `src/endpoints/contact.ts`):

```typescript
import payload from 'payload';

export const contactHandler = async (req, res, next) => {
  const { name, email, message, token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token de captcha é obrigatório." });
  }

  try {
    // 1. Validar Token
    const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY, // Adicione ao .env do Backend
        response: token,
        // remoteip: req.ip // Opcional, mas recomendado se disponível
      }),
    });

    const verifyData = await verifyResponse.json();

    if (!verifyData.success) {
      console.error("Erro Turnstile:", verifyData['error-codes']);
      return res.status(403).json({ message: "Captcha inválido ou expirado." });
    }

    // 2. Processar o envio (Salvar no banco ou enviar Email)
    // Exemplo:
    // await payload.create({
    //   collection: 'contacts',
    //   data: { name, email, message },
    // });

    return res.status(200).json({ message: "Sucesso!" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};
```

---

## 🔍 Solução de Problemas Comuns

Se a validação falhar ("requests que não funcionam"):

1.  **Token Expirado:** O token do Turnstile dura pouco tempo. Se o seu backend demorar muito para validar, o token expira.
    *   *Solução:* Valide o token **imediatamente** antes de qualquer outra lógica pesada (como enviar e-mail).
2.  **Chave Incorreta:** Confirme se está usando a `SECRET_KEY` (começa geralmente com `0x...`) no backend e a `SITE_KEY` no frontend. Se inverter, falha sempre.
3.  **Formato do Envio:** A API do Cloudflare aceita `application/x-www-form-urlencoded` ou `application/json`.
    *   No Worker (exemplo acima), usamos `FormData` que é nativo e robusto.
    *   No Node.js, `JSON.stringify` costuma funcionar bem, mas verifique se o endpoint da Cloudflare não mudou os requisitos.
4.  **IP do Cliente:** Enviar o `remoteip` é opcional mas ajuda o Cloudflare a detectar fraudes. No Worker é fácil pegar (`headers.get("CF-Connecting-IP")`). No backend, pode ser mais difícil se estiver atrás de proxies (precisa confiar no header `X-Forwarded-For`).
