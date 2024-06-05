"use client"

import mergeClass from "@/utils/class-name";
import { MouseEvent, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

type DialogType = {
  children: React.ReactNode,
  className?: string,
  outsideable?: boolean,
}

export type DialogRef = {
  open: () => void,
  close: () => void,
}

const Dialog = forwardRef<DialogRef, DialogType>(({
  children,
  className,
  outsideable = true
}, ref) => {
  const dialog = useRef<any>(null);
  const [show, setShow] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      open: () => setShow(true),
      close: () => setShow(false),
    }
  })

  useEffect(() => {
    if(show) {
      dialog.current?.showModal();
      document.body.classList.add("!overflow-hidden");
    } else {
      dialog.current?.close();
      document.body.classList.remove("!overflow-hidden");
    }
  }, [show])

  const outsideClickHandler = (event: MouseEvent) => {
    event.preventDefault();
    if(event.target === dialog.current && outsideable) setShow(false);
  }

  return (
    <dialog 
      ref={dialog}
      className={
        mergeClass(
          "outline-none rounded-lg max-w-full mx-4 md:mx-auto md:max-w-[calc(100vw*2/3)] lg:max-w-[calc(100vw*5/12)] shadow-md bg-gray-50 dark:bg-slate-800",
          "backdrop:bg-black/50 backdrop:backdrop-blur-sm"
        )
      }
      onClick={outsideClickHandler}
    >
      <section 
        className={
          mergeClass(
            "max-h-[calc(100vh-100px)] py-2 px-4 overflow-y-auto",
            className || ""
          )
        }
      >
        {children}
      </section>
    </dialog>
  );
})

Dialog.displayName = "Dialog"

export default Dialog