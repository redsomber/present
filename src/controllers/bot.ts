import { Context } from 'grammy'
import { Coupon, couponModel } from '@/models/Coupon'
import { Menu } from '@grammyjs/menu'
import bot from '@/helpers/bot'

export const menu = new Menu('menu')
  .text('Абсолютно', async (ctx: Context) => {
    const coupon = await couponModel.findOne({ id: '6442a6793bf485dc1fd6fe32' })

    if (coupon) {
      if (coupon.coupons > 0) {
        coupon.coupons--
        await coupon.save()
        await bot.api.sendMessage(
          505211008,
          `Даша заюзала купон. Осталось ${coupon.coupons}`
        )
        return ctx.reply(`Вызов принят. Осталось ${coupon.coupons} из 10`)
      } else {
        return ctx.reply('Твои купоны закончились, оставь мой язык в покое')
      }
    } else {
      return ctx.reply(`error`)
    }
  })
  .text('Отмена', (ctx: Context) => ctx.reply('Очкошница'))

export async function takeCuni(ctx: Context) {
  // Send a question with a menu of two buttons
  return await ctx.reply(
    'Ты уверена, что хочешь заюзать купон? Наебать не получится, купоны в базе данных)',
    {
      reply_markup: menu,
    }
  )
}

export async function showCupons(ctx: Context) {
  try {
    if (!ctx.message?.from?.id) {
      return console.log('Empty user')
    }

    const db = await couponModel.findOne({ id: '6442a6793bf485dc1fd6fe32' })

    await ctx.reply(`У тебя осталось ${db?.coupons} купонов`)
  } catch (error) {
    console.error(error)
  }
}
