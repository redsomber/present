import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: { timestamps: true },
})
export class Coupon {
  @prop()
  coupons!: number
}
export const couponModel = getModelForClass(Coupon)
