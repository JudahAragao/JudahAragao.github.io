import { Check, Copy } from "lucide-react";
import { useState } from "react";
import hljs from "highlight.js";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "typescript" }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  // Normalize language
  let lang = (language || "typescript").toLowerCase();
  const languageMap: Record<string, string> = {
    html: "xml",
    js: "javascript",
    ts: "typescript",
    py: "python",
    sh: "bash",
    shell: "bash",
  };
  if (languageMap[lang]) {
    lang = languageMap[lang];
  }

  // Highlight code
  let highlightedCode = code;
  try {
    if (hljs.getLanguage(lang)) {
      highlightedCode = hljs.highlight(code, { language: lang }).value;
    } else {
      highlightedCode = hljs.highlightAuto(code).value;
    }
  } catch (error) {
    console.error("Highlighting failed:", error);
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const lineCount = code.split("\n").length;

  return (
    <div className="relative my-6 rounded-lg bg-[#282c34] border border-[#282c34] overflow-hidden shadow-md group">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#21252b] border-b border-white/10">
        <span className="text-xs font-mono text-gray-400 lowercase">{lang}</span>
        <button
          onClick={copyToClipboard}
          className={cn(
            "p-1.5 rounded-md transition-all duration-200",
            isCopied
              ? "bg-green-500/10 text-green-500"
              : "text-gray-400 hover:text-white hover:bg-white/10"
          )}
          aria-label="Copy code"
        >
          {isCopied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="flex overflow-x-auto">
        {/* Line Numbers */}
        <div 
          className="flex flex-col shrink-0 text-right select-none py-4 pl-3 pr-2 bg-[#282c34] border-r border-white/5 text-[#495162] font-mono text-sm leading-6"
          aria-hidden="true"
        >
          {Array.from({ length: lineCount }).map((_, i) => (
            <span key={i} className="block">
              {i + 1}
            </span>
          ))}
        </div>

        {/* Code */}
        <div className="grow">
            <pre className="p-4 pl-3 !bg-transparent !m-0 overflow-visible font-mono text-sm leading-6">
            <code
                className={`language-${lang} !bg-transparent !p-0 block min-w-min`}
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
            </pre>
        </div>
      </div>
    </div>
  );
}
