import { useState } from "react";
import { z } from "zod";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { Turnstile } from '@marsidev/react-turnstile';
import { api } from "@/lib/api";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Nome é obrigatório" })
    .max(100, { message: "Nome deve ter no máximo 100 caracteres" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Email inválido" })
    .max(255, { message: "Email deve ter no máximo 255 caracteres" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Mensagem é obrigatória" })
    .max(1000, { message: "Mensagem deve ter no máximo 1000 caracteres" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [token, setToken] = useState<string | null>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert('Verificação pendente...');
      return;
    }

    setErrors({});
    
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof ContactFormData;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus("sending");
    try {
      await api.post("contact", {
        ...result.data,
        "cf-turnstile-response": token,
      });
      setStatus("success");
      setFeedbackMessage("Mensagem enviada com sucesso! Obrigado pelo contato.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setFeedbackMessage("Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.");
      console.error("Failed to send contact form:", error);
    }
  };

  if (status === "success" || status === "error") {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center bg-card border rounded-lg">
        {status === "success" ? (
          <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
        ) : (
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        )}
        <p className="text-heading font-medium mb-2">
          {status === "success" ? "Enviado!" : "Erro!"}
        </p>
        <p className="text-body text-sm mb-6">{feedbackMessage}</p>
        <button 
          onClick={() => setStatus("idle")}
          className="px-4 py-2 text-sm bg-secondary rounded-lg hover:opacity-90"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm text-body mb-2">
          Nome
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Seu nome"
          className={`w-full px-4 py-3 bg-background border rounded-lg text-heading placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all theme-transition ${
            errors.name ? "border-red-500" : "border-border focus:border-primary"
          }`}
          disabled={status === "sending"}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-body mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="seu@email.com"
          className={`w-full px-4 py-3 bg-background border rounded-lg text-heading placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all theme-transition ${
            errors.email ? "border-red-500" : "border-border focus:border-primary"
          }`}
          disabled={status === "sending"}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-body mb-2">
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Sua mensagem..."
          rows={4}
          className={`w-full px-4 py-3 bg-background border rounded-lg text-heading placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none theme-transition ${
            errors.message ? "border-red-500" : "border-border focus:border-primary"
          }`}
          disabled={status === "sending"}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.message}
          </p>
        )}
        <p className="mt-1 text-xs text-subtle text-right">
          {formData.message.length}/1000
        </p>
      </div>

      <div className="mt-6">
        <Turnstile
          siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}  // ← cole a Site Key do dashboard Cloudflare
          onSuccess={(tokenGenerated) => {
            setToken(tokenGenerated);  // ← salva o token quando o challenge passa
            console.log("Turnstile token gerado:", tokenGenerated);
          }}
          onError={(error) => {
            console.error("Turnstile error:", error);
            setToken(null); // opcional: reseta se der erro
          }}
          onExpire={() => {
            setToken(null); // token expira após ~5 min, força nova verificação
            console.warn("Turnstile token expirou");
          }}
          options={{
            theme: "auto",  // auto = detecta light/dark baseado no seu CSS (melhor UX)
            // size: "compact", // se o widget parecer grande demais no mobile
            // execution: "execute", // default: roda challenge imediatamente; "render" roda só quando chamado via ref
          }}
          // execution="execute" // default, roda logo; ou "render" para rodar só no submit
          // size="normal"       // "normal" | "compact" | "invisible" (se quiser sem nada visível)
        />
      </div>

      {/* Feedback visual opcional se token ainda não gerado */}
      {!token && status === "idle" && (
        <p className="mt-2 text-xs text-subtle text-center">
          Verificando se você é humano... (pode demorar 1-2s)
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending" || !token}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-heading text-background rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          <>
            <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Enviar Mensagem
          </>
        )}
      </button>
    </form>
  );
}