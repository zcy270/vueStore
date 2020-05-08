<template>
  <div class="hot_box" @click="getGoodsIdPages()">
    <img :src="hotgoodsimage" alt="" width="100%" />
    <div class="goods-name">{{ hotgoodsname }}</div>
    <div class="">{{ hotgoodsprice | moneyFilter }}</div>
    
  </div>
</template>
<script>
import { toMoney } from "@/filter/moneyFilter";
export default {
  props: ["hotgoodsimage", "hotgoodsprice", "hotgoodsname", "goodsId"],
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  methods: {
    getGoodsIdPages() {
      this.$router.push({ name: "Goods", query: { goodsId: this.goodsId } });
    }
  }
};
</script>
<style scoped>
.goods-name {
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
