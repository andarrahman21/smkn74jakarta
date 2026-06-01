"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor, useEditorState, EditorContent, Editor } from "@tiptap/react";
import * as Popover from "@radix-ui/react-popover";
import StarterKit from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Table, TableRow, TableHeader, TableCell } from "@tiptap/extension-table";
import { TextAlign } from "@tiptap/extension-text-align";
import {
  Heading2,
  Heading3,
  Pilcrow,
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Minus,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Undo2,
  Redo2,
  RowsIcon,
  Columns,
  Trash2,
  Unlink,
  ExternalLink,
  Check,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";

type Props = {
  name: string;
  initialValue?: string;
  placeholder?: string;
  uploadFolder?: string;
};

export function RichTextEditor({
  name,
  initialValue = "",
  placeholder = "Tulis…",
  uploadFolder = "pengumuman",
}: Props) {
  const [html, setHtml] = useState(initialValue);

  function countWords(htmlStr: string) {
    const text = htmlStr.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").trim();
    return text ? text.split(/\s+/).filter(Boolean).length : 0;
  }

  const [wordCount, setWordCount] = useState(() => countWords(initialValue));
  const [linkPopoverOpen, setLinkPopoverOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] }, link: false }),
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Placeholder.configure({ placeholder }),
      Table.configure({ resizable: true, HTMLAttributes: { class: "tiptap-table" } }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({
        types: ["heading", "paragraph", "tableCell", "tableHeader"],
        alignments: ["left", "center", "right", "justify"],
        defaultAlignment: "left",
      }),
    ],
    content: initialValue || "<p></p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm md:prose-base max-w-none focus:outline-none min-h-[300px] px-4 py-3",
        "data-gramm": "false",
        "data-gramm_editor": "false",
        "data-enable-grammarly": "false",
      },
    },
    onUpdate({ editor }) {
      const h = editor.getHTML();
      setHtml(h);
      setWordCount(countWords(h));
    },
  });

  const uploadImage = useCallback(
    async (file: File) => {
      if (!editor) return;
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", uploadFolder);

      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) {
        alert(data?.error || "Gagal upload gambar");
        return;
      }
      editor.chain().focus().setImage({ src: data.url, alt: file.name }).run();
    },
    [editor, uploadFolder]
  );

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadImage(file);
    e.target.value = "";
  };

  useEffect(() => {
    if (!editor) return;
    const view = editor.view;
    const handlePaste = (event: ClipboardEvent) => {
      const item = Array.from(event.clipboardData?.items ?? []).find((i) =>
        i.type.startsWith("image/")
      );
      if (!item) return;
      const file = item.getAsFile();
      if (file) {
        event.preventDefault();
        uploadImage(file);
      }
    };
    const handleDrop = (event: DragEvent) => {
      const file = Array.from(event.dataTransfer?.files ?? []).find((f) =>
        f.type.startsWith("image/")
      );
      if (file) {
        event.preventDefault();
        uploadImage(file);
      }
    };
    view.dom.addEventListener("paste", handlePaste);
    view.dom.addEventListener("drop", handleDrop);
    return () => {
      view.dom.removeEventListener("paste", handlePaste);
      view.dom.removeEventListener("drop", handleDrop);
    };
  }, [editor, uploadImage]);

  if (!editor) {
    return (
      <div className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-muted">
        Memuat editor…
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-black/10 bg-white focus-within:border-amber focus-within:ring-2 focus-within:ring-amber/20 transition">
      <Toolbar
        editor={editor}
        onPickImage={() => fileInputRef.current?.click()}
        linkPopoverOpen={linkPopoverOpen}
        setLinkPopoverOpen={setLinkPopoverOpen}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="hidden"
      />
      <div className="relative">
        <EditorContent editor={editor} />
        <LinkBubble editor={editor} onEdit={() => setLinkPopoverOpen(true)} />
      </div>
      <div className="flex items-center justify-end px-4 py-2 border-t border-black/5">
        <span className="text-[11px] text-muted tabular-nums">
          {wordCount} kata
        </span>
      </div>
      <input type="hidden" name={name} value={html} />
    </div>
  );
}

/* ----------------- Toolbar ----------------- */
function Toolbar({
  editor,
  onPickImage,
  linkPopoverOpen,
  setLinkPopoverOpen,
}: {
  editor: Editor;
  onPickImage: () => void;
  linkPopoverOpen: boolean;
  setLinkPopoverOpen: (open: boolean) => void;
}) {
  const state = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isH2: editor.isActive("heading", { level: 2 }),
      isH3: editor.isActive("heading", { level: 3 }),
      isP: editor.isActive("paragraph"),
      isBold: editor.isActive("bold"),
      isItalic: editor.isActive("italic"),
      isStrike: editor.isActive("strike"),
      isCode: editor.isActive("code"),
      isBullet: editor.isActive("bulletList"),
      isOrdered: editor.isActive("orderedList"),
      isQuote: editor.isActive("blockquote"),
      isLink: editor.isActive("link"),
      isTable: editor.isActive("table"),
      alignLeft: editor.isActive({ textAlign: "left" }),
      alignCenter: editor.isActive({ textAlign: "center" }),
      alignRight: editor.isActive({ textAlign: "right" }),
      alignJustify: editor.isActive({ textAlign: "justify" }),
      canUndo: editor.can().undo(),
      canRedo: editor.can().redo(),
    }),
  });

  const toolbarRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const el = toolbarRef.current;
    if (!el) return;
    const sentinel = document.createElement("div");
    sentinel.style.cssText =
      "position:absolute;top:0;left:0;right:0;height:1px;pointer-events:none;";
    const parent = el.parentElement;
    if (!parent) return;
    const prevPos = parent.style.position;
    if (getComputedStyle(parent).position === "static") {
      parent.style.position = "relative";
    }
    parent.insertBefore(sentinel, el);
    const obs = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    obs.observe(sentinel);
    return () => {
      obs.disconnect();
      sentinel.remove();
      parent.style.position = prevPos;
    };
  }, []);

  const setHeading = (level: 2 | 3) => {
    if (editor.isActive("heading", { level })) return;
    editor.chain().focus().setHeading({ level }).run();
  };

  const setParagraph = () => {
    if (editor.isActive("paragraph")) return;
    editor.chain().focus().setParagraph().run();
  };

  return (
    <div
      ref={toolbarRef}
      className={`sticky top-0 z-30 flex flex-wrap items-center gap-1 px-2 py-2 border-b border-black/10 bg-paper-soft/95 backdrop-blur supports-[backdrop-filter]:bg-paper-soft/80 transition-all ${
        stuck ? "rounded-none shadow-sm" : "rounded-t-xl"
      }`}
    >
      <TBtn active={state.isP} onMouseDown={setParagraph} title="Paragraf"><Pilcrow size={16} strokeWidth={2} /></TBtn>
      <TBtn active={state.isH2} onMouseDown={() => setHeading(2)} title="Heading 2"><Heading2 size={16} strokeWidth={2} /></TBtn>
      <TBtn active={state.isH3} onMouseDown={() => setHeading(3)} title="Heading 3"><Heading3 size={16} strokeWidth={2} /></TBtn>
      <Sep />
      <TBtn active={state.isBold} onMouseDown={() => editor.chain().focus().toggleBold().run()} title="Bold (⌘B)"><Bold size={16} strokeWidth={2.5} /></TBtn>
      <TBtn active={state.isItalic} onMouseDown={() => editor.chain().focus().toggleItalic().run()} title="Italic (⌘I)"><Italic size={16} strokeWidth={2} /></TBtn>
      <TBtn active={state.isStrike} onMouseDown={() => editor.chain().focus().toggleStrike().run()} title="Strikethrough"><Strikethrough size={16} strokeWidth={2} /></TBtn>
      <TBtn active={state.isCode} onMouseDown={() => editor.chain().focus().toggleCode().run()} title="Inline code"><Code size={16} strokeWidth={2} /></TBtn>
      <Sep />
      <TBtn active={state.isBullet} onMouseDown={() => editor.chain().focus().toggleBulletList().run()} title="Bullet list"><List size={16} strokeWidth={2} /></TBtn>
      <TBtn active={state.isOrdered} onMouseDown={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered list"><ListOrdered size={16} strokeWidth={2} /></TBtn>
      <TBtn active={state.isQuote} onMouseDown={() => editor.chain().focus().toggleBlockquote().run()} title="Blockquote"><Quote size={16} strokeWidth={2} /></TBtn>
      <TBtn onMouseDown={() => editor.chain().focus().setHorizontalRule().run()} title="Garis pemisah"><Minus size={16} strokeWidth={2} /></TBtn>
      <Sep />
      <TBtn active={state.alignLeft} onMouseDown={() => editor.chain().focus().setTextAlign("left").run()} title="Rata kiri"><AlignLeft size={16} strokeWidth={2} /></TBtn>
      <TBtn active={state.alignCenter} onMouseDown={() => editor.chain().focus().setTextAlign("center").run()} title="Rata tengah"><AlignCenter size={16} strokeWidth={2} /></TBtn>
      <TBtn active={state.alignRight} onMouseDown={() => editor.chain().focus().setTextAlign("right").run()} title="Rata kanan"><AlignRight size={16} strokeWidth={2} /></TBtn>
      <TBtn active={state.alignJustify} onMouseDown={() => editor.chain().focus().setTextAlign("justify").run()} title="Rata kanan-kiri"><AlignJustify size={16} strokeWidth={2} /></TBtn>
      <Sep />
      <LinkPopover editor={editor} isLink={state.isLink} open={linkPopoverOpen} onOpenChange={setLinkPopoverOpen} />
      <TBtn onMouseDown={onPickImage} title="Upload gambar"><ImageIcon size={16} strokeWidth={2} /></TBtn>
      <Sep />
      <TBtn
        onMouseDown={() =>
          editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
        }
        title="Sisipkan tabel 3×3"
      >
        <TableIcon size={16} strokeWidth={2} />
      </TBtn>
      {state.isTable && (
        <>
          <TBtn onMouseDown={() => editor.chain().focus().addRowAfter().run()} title="Tambah baris">
            <span className="inline-flex items-center gap-0.5"><RowsIcon size={14} /><span className="text-[10px]">+</span></span>
          </TBtn>
          <TBtn onMouseDown={() => editor.chain().focus().addColumnAfter().run()} title="Tambah kolom">
            <span className="inline-flex items-center gap-0.5"><Columns size={14} /><span className="text-[10px]">+</span></span>
          </TBtn>
          <TBtn onMouseDown={() => editor.chain().focus().deleteRow().run()} title="Hapus baris">
            <span className="inline-flex items-center gap-0.5"><RowsIcon size={14} /><span className="text-[10px]">−</span></span>
          </TBtn>
          <TBtn onMouseDown={() => editor.chain().focus().deleteColumn().run()} title="Hapus kolom">
            <span className="inline-flex items-center gap-0.5"><Columns size={14} /><span className="text-[10px]">−</span></span>
          </TBtn>
          <TBtn onMouseDown={() => editor.chain().focus().deleteTable().run()} title="Hapus tabel"><Trash2 size={16} strokeWidth={2} /></TBtn>
        </>
      )}
      <Sep />
      <TBtn onMouseDown={() => editor.chain().focus().undo().run()} disabled={!state.canUndo} title="Undo (⌘Z)"><Undo2 size={16} strokeWidth={2} /></TBtn>
      <TBtn onMouseDown={() => editor.chain().focus().redo().run()} disabled={!state.canRedo} title="Redo (⌘⇧Z)"><Redo2 size={16} strokeWidth={2} /></TBtn>
    </div>
  );
}

function TBtn({
  active,
  disabled,
  onMouseDown,
  children,
  title,
}: {
  active?: boolean;
  disabled?: boolean;
  onMouseDown: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        if (!disabled) onMouseDown();
      }}
      disabled={disabled}
      title={title}
      className={`h-8 min-w-[32px] px-2 rounded-md text-xs font-medium inline-flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
        active ? "bg-navy text-paper" : "hover:bg-white text-ink/70 hover:text-navy"
      }`}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <span className="mx-1 h-5 w-px bg-black/10" />;
}

/* ----------------- Link Popover ----------------- */
function LinkPopover({
  editor,
  isLink,
  open,
  onOpenChange,
}: {
  editor: Editor;
  isLink: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const setOpen = onOpenChange;
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const savedRangeRef = useRef<{ from: number; to: number } | null>(null);

  const openPopover = () => {
    const { from, to, empty } = editor.state.selection;
    const linkAttrs = editor.getAttributes("link");
    const existingHref = (linkAttrs.href as string | undefined) ?? "";

    if (isLink) {
      const range = (editor.state.doc.type.schema.marks.link
        ? (() => {
            const { $from } = editor.state.selection;
            const mark = $from.marks().find((m) => m.type.name === "link");
            if (!mark) return null;
            let start = $from.pos;
            let end = $from.pos;
            editor.state.doc.nodesBetween(0, editor.state.doc.content.size, (node, pos) => {
              if (node.isText && node.marks.some((m) => m.type.name === "link" && m.attrs.href === mark.attrs.href)) {
                if (pos <= $from.pos && pos + node.nodeSize >= $from.pos) {
                  start = pos;
                  end = pos + node.nodeSize;
                }
              }
            });
            return { from: start, to: end };
          })()
        : null);
      if (range) {
        savedRangeRef.current = range;
        setText(editor.state.doc.textBetween(range.from, range.to));
      } else {
        savedRangeRef.current = { from, to };
        setText(editor.state.doc.textBetween(from, to));
      }
      setUrl(existingHref || "https://");
    } else {
      savedRangeRef.current = { from, to };
      setText(empty ? "" : editor.state.doc.textBetween(from, to));
      setUrl("https://");
    }
    setOpen(true);
  };

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const range = savedRangeRef.current;
    if (!range) return;
    const trimmedUrl = url.trim();
    const trimmedText = text.trim();
    if (!trimmedUrl || trimmedUrl === "https://") {
      setOpen(false);
      return;
    }

    const chain = editor.chain().focus().setTextSelection(range);

    if (range.from === range.to) {
      const label = trimmedText || trimmedUrl;
      chain
        .insertContent({
          type: "text",
          text: label,
          marks: [{ type: "link", attrs: { href: trimmedUrl } }],
        })
        .run();
    } else {
      const currentText = editor.state.doc.textBetween(range.from, range.to);
      if (trimmedText && trimmedText !== currentText) {
        chain
          .insertContent({
            type: "text",
            text: trimmedText,
            marks: [{ type: "link", attrs: { href: trimmedUrl } }],
          })
          .run();
      } else {
        chain.extendMarkRange("link").setLink({ href: trimmedUrl }).run();
      }
    }
    setOpen(false);
  };

  const unlink = () => {
    const range = savedRangeRef.current;
    if (range) {
      editor.chain().focus().setTextSelection(range).extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
    setOpen(false);
  };

  const visit = () => {
    const trimmed = url.trim();
    if (trimmed && trimmed !== "https://") {
      window.open(trimmed, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Popover.Root
      open={open}
      onOpenChange={(next) => {
        if (next) openPopover();
        else setOpen(false);
      }}
    >
      <Popover.Trigger asChild>
        <button
          type="button"
          title="Link"
          className={`h-8 min-w-[32px] px-2 rounded-md text-xs font-medium inline-flex items-center justify-center transition-colors ${
            isLink ? "bg-navy text-paper" : "hover:bg-white text-ink/70 hover:text-navy"
          }`}
        >
          <LinkIcon size={16} strokeWidth={2} />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="start"
          sideOffset={6}
          className="z-50 w-[340px] rounded-xl border border-black/10 bg-white shadow-lg p-3"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            const root = e.currentTarget as HTMLElement;
            const selector = text ? 'input[name="link-url"]' : 'input[name="link-text"]';
            const input = root.querySelector<HTMLInputElement>(selector);
            input?.focus();
            input?.select();
          }}
        >
          <form onSubmit={submit} className="space-y-2.5">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-muted mb-1">
                Teks
              </label>
              <input
                name="link-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Teks yang ditampilkan"
                className="w-full h-9 px-3 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-muted mb-1">
                URL
              </label>
              <div className="flex gap-1.5">
                <input
                  name="link-url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://…"
                  className="flex-1 h-9 px-3 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition"
                />
                {isLink && (
                  <button
                    type="button"
                    onClick={visit}
                    title="Buka link di tab baru"
                    className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-black/10 text-ink/60 hover:bg-paper-soft hover:text-navy transition-colors"
                  >
                    <ExternalLink size={14} />
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              {isLink ? (
                <button
                  type="button"
                  onClick={unlink}
                  className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-medium text-rust hover:bg-rust hover:text-paper transition-colors"
                >
                  <Unlink size={13} />
                  Hapus link
                </button>
              ) : (
                <span />
              )}
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="h-8 px-3 rounded-full text-xs font-medium text-muted hover:bg-paper-soft hover:text-ink transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-navy text-paper text-xs font-medium hover:bg-ink transition-colors"
                >
                  <Check size={13} />
                  {isLink ? "Simpan" : "Sisipkan"}
                </button>
              </div>
            </div>
          </form>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

/* ----------------- Link Bubble (inline edit affordance) ----------------- */
function LinkBubble({ editor, onEdit }: { editor: Editor; onEdit: () => void }) {
  const [state, setState] = useState<{
    show: boolean;
    top: number;
    left: number;
    href: string;
  }>({ show: false, top: 0, left: 0, href: "" });
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (!editor.isActive("link")) {
        setState((s) => (s.show ? { ...s, show: false } : s));
        return;
      }
      const href = (editor.getAttributes("link").href as string) || "";
      const { from } = editor.state.selection;
      const start = editor.view.coordsAtPos(from);
      const wrapper = wrapperRef.current?.parentElement;
      if (!wrapper) return;
      const wRect = wrapper.getBoundingClientRect();
      setState({
        show: true,
        top: start.bottom - wRect.top + 6,
        left: start.left - wRect.left,
        href,
      });
    };
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);
    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);

  const unlink = () => editor.chain().focus().extendMarkRange("link").unsetLink().run();
  const open = () => {
    if (state.href) window.open(state.href, "_blank", "noopener,noreferrer");
  };

  if (!state.show) return <div ref={wrapperRef} className="hidden" />;

  return (
    <div
      ref={wrapperRef}
      className="absolute z-40 inline-flex items-center gap-0.5 rounded-lg border border-black/10 bg-white shadow-md px-1 py-1 text-xs"
      style={{ top: state.top, left: state.left }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <a
        href={state.href}
        target="_blank"
        rel="noopener noreferrer"
        className="max-w-[220px] truncate px-2 py-1 rounded-md text-navy hover:underline"
        title={state.href}
      >
        {state.href.replace(/^https?:\/\//, "")}
      </a>
      <span className="h-4 w-px bg-black/10 mx-0.5" />
      <button
        type="button"
        onClick={open}
        title="Buka di tab baru"
        className="h-7 w-7 inline-flex items-center justify-center rounded-md text-ink/60 hover:bg-paper-soft hover:text-navy transition-colors"
      >
        <ExternalLink size={13} />
      </button>
      <button
        type="button"
        onClick={onEdit}
        title="Edit link"
        className="h-7 px-2 inline-flex items-center justify-center rounded-md text-ink/70 hover:bg-paper-soft hover:text-navy transition-colors font-medium"
      >
        Edit
      </button>
      <button
        type="button"
        onClick={unlink}
        title="Hapus link"
        className="h-7 w-7 inline-flex items-center justify-center rounded-md text-rust hover:bg-rust hover:text-paper transition-colors"
      >
        <Unlink size={13} />
      </button>
    </div>
  );
}
