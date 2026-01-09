import { useRef } from "react";

const Attachments = ({ onSelectFile }) => {
  const fileInputRef = useRef(null);

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);

      onSelectFile({
        file,
        preview: previewUrl,
        type: "image",
      });
    }

    event.target.value = "";
  };


  return (
    <div className="dropdown dropdown-top">
      {/* Plus button */}
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost rounded-3xl hover:bg-base-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6"
        >
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      </div>

      {/* Dropdown */}
      <ul
        tabIndex="-1"
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        {/* Images / Documents */}
        <li>
          <a onClick={handleOpenFilePicker}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d="M21.44 11.05l-8.49 8.49a6 6 0 0 1-8.49-8.49l8.49-8.49a4 4 0 0 1 5.66 5.66l-8.49 8.49a2 2 0 0 1-2.83-2.83l7.78-7.78" />
            </svg>
            <span className="text-md">Images / Documents</span>
          </a>
        </li>

        {/* Thinking */}
        <li>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <path d="M9 18h6" />
              <path d="M10 22h4" />
              <path d="M12 2a7 7 0 0 0-4 12c1 1 1 2 1 3h6c0-1 0-2 1-3a7 7 0 0 0-4-12z" />
            </svg>
            <span className="text-md">Thinking</span>
          </a>
        </li>
      </ul>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        hidden
        onChange={handleFileChange}
        accept="image/*,.pdf,.doc,.docx,.txt"
      />
    </div>
  );
};

export default Attachments;
