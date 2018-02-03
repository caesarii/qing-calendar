<template>
    <div class="week-row" @click="showWeekNumber">
        <day v-for="(day, index) in week"
             :day="day"
             :key="index"
             :onSelectDay="onSelectDay"
             :onEditPrice="onEditPrice"
             :mode="weekMode"
        ></day>
    </div>
</template>
<script>
//    import {WEEK_SELECTED} from '../actions';
    import Day from './Day.vue'
    export default {
        data () {
            return {
                showWeekNumberFlag: false,
                weekMode: this.mode,
            }
        },
        components: {
            Day,
        },
        props:{
            mode: null,
            week: {
                type: Array
            },
            onSelectDay: {
                type: Function
            },
            onEditPrice: null

        },
        created(){
//            let me = this;
//            this.$root.$on(WEEK_SELECTED, function (payload) {
//                if(payload.weekDate != me.week[0].date) {
//                    me.showWeekNumberFlag = false;
//                }
//            })
        },
        methods : {
            showWeekNumber() {
//                let me = this;
//                me.showWeekNumberFlag = true;
//                this.$root.$emit(WEEK_SELECTED, {weekDate:me.week[0].date});
            }
        }
    }
</script>
<style>
    .week-row {
        width: 100%;
        border-left: 1px solid #e0e0e0;
        display: flex;
        cursor: pointer;
    }
</style>
