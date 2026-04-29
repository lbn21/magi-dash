export class AppError extends Error {
    constructor(
        public readonly status: number,
        public readonly code: string,
        message: string,
        public readonly details?: unknown,
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export function toErrorResponse(error: unknown): Response {
    if (error instanceof AppError) {
        return Response.json(
            {
                error: {
                    code: error.code,
                    message: error.message,
                    details: error.details,
                },
            },
            { status: error.status },
        );
    }

    console.error('unexpected error', error);
    return Response.json(
        {
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Internal server error',
            },
        },
        { status: 500 },
    );
}