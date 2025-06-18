import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

const storage = multer.diskStorage({
  destination: 'uploads/',

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const name = crypto.randomBytes(16).toString('hex')

    cb(null, `${name}${ext}`)
  },
})

export const upload = multer({ storage })
