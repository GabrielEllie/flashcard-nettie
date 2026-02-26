type variantMode = "view" | "add" | "edit";
type FlashcardLayoutProps = {
    // selectedIds: string[];
    variant: variantMode;
    
    leftImage: React.ReactNode;
    leftDetails: React.ReactNode;
    rightImage: React.ReactNode;
    rightDetails: React.ReactNode;

    footerShow?: boolean;
    footerElement?: React.ReactNode;
    rightButtonShow?: boolean;
    rightButtonElement?: React.ReactNode;
}

export default function FlashcardLayout({
    // selectedIds,
    variant = "add",
    leftImage,
    leftDetails,
    rightImage,
    rightDetails,
    footerShow = false,
    footerElement,
    rightButtonShow = false,
    rightButtonElement,
    
} : FlashcardLayoutProps) {

  let height = 'h-fit';
  if (variant === "view") {
    height = "h-40";
  } else {
    height = "h-fit";
  }

  return (
    <div className={`${height} bg-blue-600 min-w-[1000px] w-[95%] p-4 flex flex-col rounded-xl`}>
        <div className="flex flex-row justify-around w-full">
            <div className="flex flex-col justify-center w-[45%]">
                <div className="flex flex-row"> 
                {leftImage}
                {leftDetails}
                </div>
            </div>
            <div className="flex flex-col justify-center w-[45%]">
                <div className="flex flex-row"> 
                {rightImage}
                {rightDetails}
                </div>
            </div>
            {rightButtonShow && rightButtonElement}
        </div>
        {footerShow && footerElement}
    </div>
);
}
