import multer from 'multer'

const storage = multer.diskStorage({
  destination: 'uploads',

  filename: (_req, file, cb) => {
    cb(null, `${file.originalname}`)
  },
})

export const upload = multer({ storage })
