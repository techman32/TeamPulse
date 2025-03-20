import { ChangeEvent } from 'react'
import Input from '@/shared/ui/input'

type PhotoUploadProps = {
  photoPreview: string | null
  onFileChange: (file: File | null) => void
}

export const PhotoUpload = ({ photoPreview, onFileChange }: PhotoUploadProps) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    onFileChange(file)
  }

  return (
    <>
      <Input type="file" onChange={handleFileChange} />
      {photoPreview && (
        <div className="mt-2">
          <h3 className="font-semibold">Предосмотр:</h3>
          <img src={photoPreview} alt="Предосмотр" className="w-32 h-32 object-cover rounded-md" />
        </div>
      )}
    </>
  )
}
