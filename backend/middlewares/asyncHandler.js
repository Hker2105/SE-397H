// async function asyncHandler(fn) {}

const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        }catch(error) {
            return res.status(500).json({
                message: 'Internal Sever Error',
                error: process.env.NODE_ENV === 'development' ? error : ''
            })
        }
    }
}

export default asyncHandler;