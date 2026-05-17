"use client";

import { useCallback, useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Link2,
  Undo2,
  Redo2,
  Unlink,
} from "lucide-react";

type EditorMode = "visual" | "html";

type RichHtmlEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  /** Shorter toolbar for short descriptions */
  variant?: "compact" | "full";
  minHeight?: string;
};

function ToolbarButton({
  onClick,
  active,
  title,
  children,
  disabled,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`flex h-8 w-8 items-center justify-center border transition-colors ${
        active
          ? "border-[#0F2647] bg-[#0F2647] text-white"
          : "border-transparent text-[#6B6966] hover:border-[#E5E4E0] hover:bg-[#F8F8F7] hover:text-[#1A1917]"
      } disabled:cursor-not-allowed disabled:opacity-40`}
    >
      {children}
    </button>
  );
}

export default function RichHtmlEditor({
  value,
  onChange,
  placeholder = "Start typing…",
  variant = "full",
  minHeight = "280px",
}: RichHtmlEditorProps) {
  const [mode, setMode] = useState<EditorMode>("visual");
  const [htmlDraft, setHtmlDraft] = useState(value);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: variant === "full" ? { levels: [2, 3] } : false,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-[#0F2647] underline" },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none px-4 py-3 text-[#1A1917] focus:outline-none min-h-[inherit]",
      },
    },
    onUpdate: ({ editor: ed }) => {
      if (mode === "visual") {
        const html = ed.getHTML();
        onChange(html === "<p></p>" ? "" : html);
        setHtmlDraft(html === "<p></p>" ? "" : html);
      }
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const normalized = value || "";
    if (mode === "visual" && current !== normalized && normalized !== (current === "<p></p>" ? "" : current)) {
      editor.commands.setContent(normalized || "<p></p>", { emitUpdate: false });
      setHtmlDraft(normalized);
    }
  }, [value, editor, mode]);

  const switchMode = useCallback(
    (next: EditorMode) => {
      if (!editor) {
        setMode(next);
        return;
      }
      if (next === "html") {
        const html = editor.getHTML();
        const out = html === "<p></p>" ? "" : html;
        setHtmlDraft(out);
        onChange(out);
      } else {
        editor.commands.setContent(htmlDraft || "<p></p>", { emitUpdate: false });
        const html = editor.getHTML();
        const out = html === "<p></p>" ? "" : html;
        onChange(out);
      }
      setMode(next);
    },
    [editor, htmlDraft, onChange]
  );

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return (
      <div
        className="animate-pulse border border-[#E5E4E0] bg-[#F8F8F7]"
        style={{ minHeight }}
      />
    );
  }

  return (
    <div className="border border-[#E5E4E0] bg-white">
      {/* Mode tabs + toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E4E0] bg-[#F8F8F7] px-2 py-2">
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => switchMode("visual")}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
              mode === "visual"
                ? "bg-white text-[#0F2647] shadow-sm"
                : "text-[#6B6966] hover:text-[#1A1917]"
            }`}
          >
            Normal view
          </button>
          <button
            type="button"
            onClick={() => switchMode("html")}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
              mode === "html"
                ? "bg-white text-[#0F2647] shadow-sm"
                : "text-[#6B6966] hover:text-[#1A1917]"
            }`}
          >
            HTML
          </button>
        </div>

        {mode === "visual" && (
          <div className="flex flex-wrap items-center gap-0.5">
            <ToolbarButton
              title="Bold"
              active={editor.isActive("bold")}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold size={15} />
            </ToolbarButton>
            <ToolbarButton
              title="Italic"
              active={editor.isActive("italic")}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic size={15} />
            </ToolbarButton>
            <ToolbarButton
              title="Underline"
              active={editor.isActive("underline")}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <UnderlineIcon size={15} />
            </ToolbarButton>

            {variant === "full" && (
              <>
                <span className="mx-1 h-5 w-px bg-[#E5E4E0]" />
                <ToolbarButton
                  title="Heading 2"
                  active={editor.isActive("heading", { level: 2 })}
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                  <Heading2 size={15} />
                </ToolbarButton>
                <ToolbarButton
                  title="Heading 3"
                  active={editor.isActive("heading", { level: 3 })}
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                >
                  <Heading3 size={15} />
                </ToolbarButton>
                <span className="mx-1 h-5 w-px bg-[#E5E4E0]" />
                <ToolbarButton
                  title="Bullet list"
                  active={editor.isActive("bulletList")}
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                  <List size={15} />
                </ToolbarButton>
                <ToolbarButton
                  title="Numbered list"
                  active={editor.isActive("orderedList")}
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                  <ListOrdered size={15} />
                </ToolbarButton>
              </>
            )}

            <span className="mx-1 h-5 w-px bg-[#E5E4E0]" />
            <ToolbarButton title="Add link" active={editor.isActive("link")} onClick={setLink}>
              <Link2 size={15} />
            </ToolbarButton>
            <ToolbarButton
              title="Remove link"
              disabled={!editor.isActive("link")}
              onClick={() => editor.chain().focus().unsetLink().run()}
            >
              <Unlink size={15} />
            </ToolbarButton>
            <span className="mx-1 h-5 w-px bg-[#E5E4E0]" />
            <ToolbarButton title="Undo" onClick={() => editor.chain().focus().undo().run()}>
              <Undo2 size={15} />
            </ToolbarButton>
            <ToolbarButton title="Redo" onClick={() => editor.chain().focus().redo().run()}>
              <Redo2 size={15} />
            </ToolbarButton>
          </div>
        )}
      </div>

      {mode === "visual" ? (
        <div
          className="overflow-y-auto bg-white [&_.ProseMirror]:min-h-[inherit]"
          style={{ minHeight }}
        >
          <EditorContent editor={editor} />
        </div>
      ) : (
        <textarea
          value={htmlDraft}
          onChange={(e) => {
            setHtmlDraft(e.target.value);
            onChange(e.target.value);
          }}
          className="w-full resize-y border-0 bg-white px-4 py-3 font-mono text-sm leading-relaxed text-[#1A1917] outline-none focus:ring-0"
          style={{ minHeight }}
          spellCheck={false}
        />
      )}
    </div>
  );
}
