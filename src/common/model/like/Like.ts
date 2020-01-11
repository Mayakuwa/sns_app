export type LikeData = {
    id: string,
    userId: string
    targetId: string,
    target: string
    isLiked: boolean
}

export default class Like {
    public constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly targetId: string,
        public readonly target: string,
        public readonly isLiked: boolean
    ) {}
}
