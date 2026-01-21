# Instruções para Implementação do Backend (Formulário de Contato)

Este documento detalha os passos necessários para criar um endpoint no seu backend (PayloadCMS rodando em Next.js) que recebe os dados do formulário de contato e envia um e-mail usando o SMTP do Gmail.

---\n
### Passo 1: Gerar uma Senha de App no Gmail

Por segurança, o Gmail não permite mais o uso da sua senha de login em aplicações de terceiros. Você **precisa** gerar uma "Senha de App".

1.  **Acesse sua Conta Google:** Vá para [myaccount.google.com](https://myaccount.google.com/).
2.  **Ative a Verificação em Duas Etapas:**
    *   No menu à esquerda, vá para **Segurança**.
    *   Em "Como fazer login no Google", clique em **Verificação em duas etapas**.
    *   Siga os passos para ativá-la, se ainda não estiver ativa. Esta etapa é **obrigatória**.
3.  **Crie a Senha de App:**
    *   Volte à página de **Segurança**.
    *   Clique em **Senhas de app** (estará na mesma seção de "Como fazer login no Google").
    *   Pode ser necessário fazer login novamente.
    *   Em "Selecione o app", escolha **Outro (nome personalizado)**.
    *   Digite um nome, como `Portfolio Contato`, e clique em **Gerar**.
    *   Uma senha de **16 caracteres** será exibida. **Copie e guarde esta senha em um local seguro.** Ela não será mostrada novamente.

---\n
### Passo 2: Configurar Variáveis de Ambiente

No seu projeto backend (Payload/Next.js), crie ou atualize o arquivo `.env` (ou `.env.local`) com as credenciais do Gmail.

```env
# .env

# Credenciais do Gmail para envio de email
SMTP_USER="seu-email@gmail.com"
SMTP_PASS="sua-senha-de-app-de-16-caracteres"
```

**Importante:**
*   Substitua `seu-email@gmail.com` pelo seu endereço de e-mail do Gmail.
*   Substitua `sua-senha-de-app-de-16-caracteres` pela senha que você gerou no Passo 1.
*   Adicione `.env.local` ao seu arquivo `.gitignore` para não cometer suas credenciais.

---\n
### Passo 3: Instalar a Dependência `nodemailer`

No terminal, dentro da pasta do seu projeto backend, instale o `nodemailer`:

```bash
npm install nodemailer
# ou
yarn add nodemailer
```

---\n
### Passo 4: Criar o Endpoint da API no Next.js

Como seu backend usa Next.js, a forma mais limpa de criar um endpoint é usando um *Route Handler*.

1.  **Crie o arquivo da rota:**
    Dentro do seu projeto backend, crie a seguinte estrutura de pastas e o arquivo:
    `src/app/api/contact/route.ts`

2.  **Adicione o código abaixo ao arquivo `route.ts`:**

```typescript
// src/app/api/contact/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  // Validação simples dos dados recebidos
  const { name, email, message } = await request.json();
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Dados incompletos.' }, { status: 400 });
  }

  // Configuração do transporter do Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS, // A senha de app
    },
  });

  // Opções do e-mail
  const mailOptions = {
    from: `"${name}" <${process.env.SMTP_USER}>`, // Mostra o nome do remetente, mas envia do seu email
    to: process.env.SMTP_USER,                     // O email para onde a mensagem será enviada (o seu)
    replyTo: email,                                // Permite responder diretamente para o email do usuário
    subject: `Nova mensagem do Portfólio de: ${name}`,
    html: `
      <h1>Nova Mensagem do Portfólio</h1>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <hr>
      <h3>Mensagem:</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    // Envia o e-mail
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email enviado com sucesso!' }, { status: 200 });

  } catch (error) {
    console.error('Erro ao enviar o email:', error);
    // Em produção, evite expor detalhes do erro
    return NextResponse.json({ error: 'Falha ao enviar o email.' }, { status: 500 });
  }
}
```

---\n
### Passo 5: Teste

Após implementar os passos acima e reiniciar seu servidor de backend, o formulário de contato do seu frontend deverá ser capaz de enviar e-mails com sucesso.

**Checklist Final:**
1.  [ ] Verificação em duas etapas **ativa** no Gmail.
2.  [ ] **Senha de App** gerada e copiada.
3.  [ ] Variáveis `SMTP_USER` e `SMTP_PASS` configuradas no arquivo `.env.local` do backend.
4.  [ ] `nodemailer` instalado no backend.
5.  [ ] Arquivo `src/app/api/contact/route.ts` criado com o código fornecido.
6.  [ ] Servidor backend reiniciado para carregar as novas variáveis de ambiente.