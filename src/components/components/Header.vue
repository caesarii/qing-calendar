<template>
    <div class="calendar-header">
        <div class="header-date">{{getDate}}</div>
        <div class="header-month">{{getMonth}}</div>
        <div class="header-btns">
            <span class="btn-icon btn-icon-prev" @click="goPrev" ></span>
            <span class="btn-icon btn-icon-next" @click="goNext" ></span>
        </div>
    </div>

</template>
<script>
    import moment from 'moment';
    import {CHANGE_MONTH} from '../actions.js';
//    import Modal from 'iview'
    export default {
        data (){
            return {
            }
        },
        props : {
            currentMonth : null,
            currentDate: null,
            locale       : {
                type: String
            }
        },
        methods : {
            goPrev () {
                const self = this
                const currMonth = self.currentMonth.month()
                const nowMonth = moment().month()
//                console.log('month', currMonth, nowMonth)
                if(currMonth === nowMonth) {
                    self.$Message.error('您选择的月份不可投放')
                } else {
                    let payload = moment(this.currentMonth).subtract(1, 'months').startOf('month');
                    this.$root.$emit(CHANGE_MONTH, payload);
                }

            },
            goNext () {
                let payload = moment(this.currentMonth).add(1, 'months').startOf('month');
                this.$root.$emit(CHANGE_MONTH, payload);
            },
            goToday () {
                this.$root.$emit(CHANGE_MONTH, moment());
            }
        },
        computed: {
            getDate() {
                const dateStr = this.currentDate._d.toLocaleDateString()
                const arr = dateStr.split('/')
                const formatted = `
                    ${arr[0]}年${arr[1]}月${arr[2]}日
                    `
                return formatted
            },
            getMonth() {
                const dateStr = this.currentMonth._d.toLocaleDateString()
                const arr = dateStr.split('/')
                const formatted = `
                    ${arr[0]}年${arr[1]}月
                    `
                return formatted
            }

        },
        mounted() {
//            const self = this
//            self.month = self.getMonth()
//            self.date = self.getDate()
        }
    }
</script>
<style>
    .calendar-header{
        height: 90px;
        line-height: 60px;
        margin: -30px  0 40px;
    }
    .header-date {
        font-size: 16px;
        color: rgb(48, 137, 219);
    }
    .header-month {
        display: inline-block;
        font-size: 16px;
        color: #222222;
    }
    .header-btns {
        float: right;
        display: inline-block;
        font-size: 22px;
        margin: 5px;
    }
    .btn-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin: 5px;
        border: 2px solid #666;
        border-left: none;
        border-top: none;
        vertical-align: center;


    }
    .btn-icon-prev {
        transform: rotate(-135deg) translateY(-10px);
    }
    .btn-icon-next {
        transform: rotate(45deg);
    }
</style>
