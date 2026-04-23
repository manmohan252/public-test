import { useState, useRef, useCallback } from "react";
import "./ImagesUpload.css";
export interface UploadedImage {
  file: File;
  preview: string;
  id: string;
  status: "pending" | "uploading" | "done" | "error";
  errorMsg?: string;
}

interface ImageUploaderProps {
  flatId: string | null;
  disabled?: boolean;
}

export default function ImageUploader({ flatId, disabled }: ImageUploaderProps) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [dragging, setDragging] = useState(false);
  const [uploadAllStatus, setUploadAllStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((files: FileList | File[]) => {
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const newImages: UploadedImage[] = valid.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      status: "pending",
    }));
    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);

  const removeImage = (id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.preview);
      return prev.filter((i) => i.id !== id);
    });
  };

  const uploadAll = async () => {
    if (!flatId) return;
    const pending = images.filter((i) => i.status === "pending");
    if (!pending.length) return;
    setUploadAllStatus("uploading");

    const results = await Promise.allSettled(
      pending.map(async (img) => {
        setImages((prev) => prev.map((i) => i.id === img.id ? { ...i, status: "uploading" } : i));
        const formData = new FormData();
        formData.append("images", img.file);
        const res = await fetch(`http://localhost:8080/api/flats/${flatId}/images`, {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error(`Upload failed (${res.status})`);
        setImages((prev) => prev.map((i) => i.id === img.id ? { ...i, status: "done" } : i));
      })
    );

    results.forEach((result, idx) => {
      if (result.status === "rejected") {
        const id = pending[idx].id;
        setImages((prev) =>
          prev.map((i) => i.id === id ? { ...i, status: "error", errorMsg: result.reason?.message } : i)
        );
      }
    });

    const allDone = results.every((r) => r.status === "fulfilled");
    setUploadAllStatus(allDone ? "done" : "error");
  };

  const pendingCount = images.filter((i) => i.status === "pending").length;
  const doneCount = images.filter((i) => i.status === "done").length;

  return (
    <div className="uploader-root">
    

      {/* Drop Zone */}
      <div
        className={`drop-zone${dragging ? " dragging" : ""}${disabled ? " disabled" : ""}`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => inputRef.current?.click()}
      >
        <div className="drop-icon">🖼️</div>
        <p className="drop-title">Drop flat images here</p>
        <p className="drop-sub">JPG, PNG, WEBP supported</p>
        <button className="browse-btn" type="button" onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}>
          Browse Files
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
      </div>

      {/* No flat ID warning */}
      {!flatId && images.length > 0 && (
        <div className="no-flat-notice">
          ⚠️ Save the flat details first to get a Flat ID before uploading images.
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <>
          <div className="img-grid">
            {images.map((img) => (
              <div key={img.id} className={`img-card status-${img.status}`}>
                <img src={img.preview} alt={img.file.name} />
                <div className="img-name">{img.file.name}</div>

                {img.status === "uploading" && (
                  <div className="uploading-ring"><div className="ring" /></div>
                )}

                <div className="status-badge">
                  {img.status === "done" && "✅"}
                  {img.status === "error" && "❌"}
                </div>

                {img.status !== "uploading" && (
                  <div className="img-overlay">
                    <button className="remove-btn" onClick={() => removeImage(img.id)}>✕</button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="upload-bar">
            <p className="upload-stats">
              <span>{images.length}</span> image{images.length !== 1 ? "s" : ""} selected
              {doneCount > 0 && <> · <span>{doneCount} uploaded</span></>}
            </p>
            {flatId && pendingCount > 0 && (
              <button
                className="upload-all-btn"
                onClick={uploadAll}
                disabled={uploadAllStatus === "uploading"}
              >
                {uploadAllStatus === "uploading" ? (
                  <><div className="ring" style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "#fff", width: 14, height: 14, borderWidth: 2 }} /> Uploading...</>
                ) : (
                  <>⬆ Upload {pendingCount} Image{pendingCount !== 1 ? "s" : ""}</>
                )}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}