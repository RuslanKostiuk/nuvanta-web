export class Shop {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly namespace: string | undefined,
    public readonly isActive: boolean,
    public readonly subscription: {
      type?: string;
      validUntil?: Date | null;
    },
  ) {}

  get isSubscriptionExpired(): boolean {
    if (!this.subscription.validUntil) return false;
    return new Date() > this.subscription.validUntil;
  }

  get displayName(): string {
    return this.namespace ? `${this.name} (${this.namespace})` : this.name;
  }
}
