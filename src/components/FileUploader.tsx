import { CrossIcon, UploadIcon } from 'lucide-react';
// import Image from 'next/image';
import * as React from 'react';
import Dropzone, {
    type DropzoneProps,
    type FileRejection
} from 'react-dropzone';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useControllableState } from '@/hooks/use-controllable-state';
import { cn, formatBytes, handleDownload } from '@/lib/utils';
import { useTranslation } from "react-i18next"
import { ModelUpload } from "@/types/nezha-api"
import { fileUpload } from "@/lib/nezha-api"

interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Value of the uploader.
   * @type File[]
   * @default undefined
   * @example value={files}
   */
  // value?: File[];
  value?: ModelUpload[];

  /**
   * Function to be called when the value changes.
   * @type React.Dispatch<React.SetStateAction<File[]>>
   * @default undefined
   * @example onValueChange={(files) => setFiles(files)}
   */
  // onValueChange?: React.Dispatch<React.SetStateAction<File[]>>;
  onValueChange?: React.Dispatch<React.SetStateAction<ModelUpload[]>>;

  /**
   * Function to be called when files are uploaded.
   * @type (files: File[]) => Promise<void>
   * @default undefined
   * @example onUpload={(files) => uploadFiles(files)}
   */
  // onUpload?: (files: File[]) => Promise<void>;

  /**
   * Progress of the uploaded files.
   * @type Record<string, number> | undefined
   * @default undefined
   * @example progresses={{ "file1.png": 50 }}
   */
  progresses?: Record<string, number>;

  /**
   * Accepted file types for the uploader.
   * @type { [key: string]: string[]}
   * @default
   * ```ts
   * { "image/*": [] }
   * ```
   * @example accept={["image/png", "image/jpeg"]}
   */
  accept?: DropzoneProps['accept'];

  /**
   * Maximum file size for the uploader.
   * @type number | undefined
   * @default 1024 * 1024 * 2 // 2MB
   * @example maxSize={1024 * 1024 * 2} // 2MB
   */
  maxSize?: DropzoneProps['maxSize'];

  /**
   * Maximum number of files for the uploader.
   * @type number | undefined
   * @default 1
   * @example maxFiles={5}
   */
  maxFiles?: DropzoneProps['maxFiles'];

  /**
   * Whether the uploader should accept multiple files.
   * @type boolean
   * @default false
   * @example multiple
   */
  multiple?: boolean;

  /**
   * Whether the uploader is disabled.
   * @type boolean
   * @default false
   * @example disabled
   */
  disabled?: boolean;
  // items: ModelUpload[];
  // setItems: React.Dispatch<React.SetStateAction<ModelUpload[]>>;
  // url?: string;
}

export function FileUploader(props: FileUploaderProps) {
    const { t } = useTranslation()
    const {
        value: valueProp,
        onValueChange,
        // onUpload,
        progresses,
        // accept = { 'image/*': [] },
        accept = {
            "application/*": [".zip",".doc",".docx",".ppt",".pptx",".xls",".xlsx"],
            "text/*": [".txt",".csv"],
            "image/*": []
        },
        maxSize = 1024 * 1024 * 2,
        maxFiles = 1,
        multiple = false,
        disabled = false,
        // items,
        // setItems,
        className,
        ...dropzoneProps
    } = props;

    const [files, setFiles] = useControllableState({
        prop: valueProp,
        onChange: onValueChange
    });

    const onUpload = async (newFiles: File[]) => {
        for (const file of newFiles) {
            const formData = new FormData();
            formData.append("file", file);
            try {
                const newItem = await fileUpload(file);
                // const items = valueProp?[...valueProp, newItem]:[newItem]
                // if (onValueChange) {
                //     onValueChange(items)
                // }
                const updatedFiles = files ? [...files, newItem] : [newItem];

                setFiles(updatedFiles);
                onValueChange?.(updatedFiles);
            } catch (e) {
                console.error(e)
                toast(t("Error"), {
                    description: t("Results.UnExpectedError"),
                })
            }
        }
    }

    const onDrop = React.useCallback(
        (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
            if (!multiple && maxFiles === 1 && acceptedFiles.length > 1) {
                toast.error('Cannot upload more than 1 file at a time');
                return;
            }

            if ((files?.length ?? 0) + acceptedFiles.length > maxFiles) {
                toast.error(`Cannot upload more than ${maxFiles} files`);
                return;
            }

            // const newFiles = acceptedFiles.map((file) =>
            //     Object.assign(file, {
            //         preview: URL.createObjectURL(file)
            //     })
            // );

            // const updatedFiles = items ? [...items, ...newFiles] : newFiles;
            //
            // setItems(updatedFiles);

            if (rejectedFiles.length > 0) {
                rejectedFiles.forEach(({ file }) => {
                    toast.error(`File ${file.name} was rejected`);
                });
            }

            if (
                onUpload &&
          acceptedFiles.length > 0 &&
          acceptedFiles.length <= maxFiles
            ) {
                const target =
            acceptedFiles.length > 0 ? `${acceptedFiles.length} files` : `file`;

                toast.promise(onUpload(acceptedFiles), {
                    loading: `Uploading ${target}...`,
                    success: () => {
                        // setFiles([]);
                        return `${target} uploaded`;
                    },
                    error: `Failed to upload ${target}`
                });
            }
        },

        // [files, maxFiles, multiple, onUpload, setFiles]
        [maxFiles, multiple, onUpload]
    );

    // function onRemove(index: number) {
    //     if (!valueProp) return;
    //     const newItems = valueProp.filter((_, i) => i !== index);
    //     onValueChange?.(newItems);
    //     // onValueChange?.(newFiles);
    // }
    function onRemove(index: number) {
        if (!files) return;
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
        onValueChange?.(newFiles);
    }

    // // Revoke preview url when component unmounts
    // React.useEffect(() => {
    //     return () => {
    //         if (!files) return;
    //         files.forEach((file) => {
    //             if (isFileWithPreview(file)) {
    //                 URL.revokeObjectURL(file.preview);
    //             }
    //         });
    //     };
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // const isDisabled = disabled || (valueProp?.length ?? 0) >= maxFiles;
    const isDisabled = disabled || (files?.length ?? 0) >= maxFiles;

    return (
        <div className='relative flex flex-col gap-6 overflow-hidden'>
            <Dropzone
                onDrop={onDrop}
                accept={accept}
                maxSize={maxSize}
                maxFiles={maxFiles}
                multiple={maxFiles > 1 || multiple}
                disabled={isDisabled}
            >
                {({ getRootProps, getInputProps, isDragActive }) => (
                    <div
                        {...getRootProps()}
                        className={cn(
                            'group border-muted-foreground/25 hover:bg-muted/25 relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed px-5 py-2.5 text-center transition',
                            'ring-offset-background focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden',
                            isDragActive && 'border-muted-foreground/50',
                            isDisabled && 'pointer-events-none opacity-60',
                            className
                        )}
                        {...dropzoneProps}
                    >
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <div className='flex flex-col items-center justify-center gap-4 sm:px-5'>
                                <div className='rounded-full border border-dashed p-3'>
                                    <UploadIcon
                                        className='text-muted-foreground size-7'
                                        aria-hidden='true'
                                    />
                                </div>
                                <p className='text-muted-foreground font-medium'>
                                    Drop the files here
                                </p>
                            </div>
                        ) : (
                            <div className='flex flex-col items-center justify-center gap-4 sm:px-5'>
                                <div className='rounded-full border border-dashed p-3'>
                                    <UploadIcon
                                        className='text-muted-foreground size-7'
                                        aria-hidden='true'
                                    />
                                </div>
                                <div className='space-y-px'>
                                    <p className='text-muted-foreground font-medium'>
                                        Drag {`'n'`} drop files here, or click to select files
                                    </p>
                                    <p className='text-muted-foreground/70 text-sm'>
                                        You can upload
                                        {maxFiles > 1
                                            ? ` ${maxFiles === Infinity ? 'multiple' : maxFiles}
                                        files (up to ${formatBytes(maxSize)} each)`
                                            : ` a file with ${formatBytes(maxSize)}`}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Dropzone>
            {files?.length ? (
                <ScrollArea className='h-fit w-full px-3'>
                    <div className='max-h-48 space-y-4'>
                        {files?.map((item, index) => (
                            <FileCard
                                key={index}
                                file={item}
                                onRemove={() => onRemove(index)}
                                progress={progresses?.[item.name]}
                            />
                        ))}
                    </div>
                </ScrollArea>
            ) : null}
        </div>
    );
}

  interface FileCardProps {
    file: ModelUpload;
    onRemove: () => void;
    progress?: number;
  }

function FileCard({ file, progress, onRemove }: FileCardProps) {
    return (
        <div className='relative flex items-center space-x-4'>
            <div className='flex flex-1 space-x-4'>
                {/*{isFileWithPreview(file) ? (*/}
                {/*    <Image*/}
                {/*        src={file.preview}*/}
                {/*        alt={file.name}*/}
                {/*        width={48}*/}
                {/*        height={48}*/}
                {/*        loading='lazy'*/}
                {/*        className='aspect-square shrink-0 rounded-md object-cover'*/}
                {/*    />*/}
                {/*) : null}*/}
                <div className='flex w-full flex-col gap-2'>
                    <div className='space-y-px'>
                      <Button variant="ghost" asChild onClick={handleDownload(file)} className="p-0 h-auto">
                        <p className='text-foreground/80 line-clamp-1 text-sm font-medium cursor-pointer hover:text-blue-600 focus:text-blue-600 focus:outline-none'>
                            {file.name}
                        </p>
                      </Button>
                        <p className='text-muted-foreground text-xs'>
                            {formatBytes(file.size)}
                        </p>
                    </div>
                    {progress ? <Progress value={progress} /> : null}
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <Button
                    type='button'
                    variant='outline'
                    size='icon'
                    className='size-7'
                    onClick={onRemove}
                >
                    <CrossIcon className='size-4' aria-hidden='true' />
                    <span className='sr-only'>Remove file</span>
                </Button>
            </div>
        </div>
    );
}

// function isFileWithPreview(file: File): file is File & { preview: string } {
//     return 'preview' in file && typeof file.preview === 'string';
// }
