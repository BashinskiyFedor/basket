<template>
    <span>
        {{ priceRub }}
    </span>
</template>

<script setup>
import { computed } from 'vue'

const prop = defineProps({
  price: Number,
  dollar: Number
})

const priceRub = computed({
    get() {
        let result = prop.price * prop.dollar;
        return parseFloat((result).toFixed(2), 10)
    }
});

</script>

<style scoped>


</style>
