<template>
    <div class="day-cell"
         :class="{
          'today' : day.isToday,
          'current-month' : day.isCurrentMonth,
          'weekend': day.isWeekEnd,
          'selected-day':day.isSelected,
          'state-gray': !day.editable,
          'state-orange': getState().used}"
         @click="selectDay">
        <div class="row">
            <div class="col-sm-6">
                <p class="day-number">{{day.date.format('D')}}</p>
                <input type="text"
                   class="day-price-input"
                   v-if="day.editable"
                   autofocus
                   :readonly="isReadOnly"
                   :value="day.price"
                   @blur="inputBlurHandler"
                />
            </div>
        </div>
    </div>
</template>
<script>
//    import {CHANGE_MONTH} from '../actions';
    export default {
        data () {
            return {
                isSelected: true,
                firstTag: true,
                inputReadOnly: false,
            }
        },
        computed: {
            isReadOnly() {
                return this.mode === 'price_detail'
            }
        },
        components: {},
        props:{
            mode: null,
            day: {
                type: Object
            },
            onEditPrice: null,
            firstDay: {
                type: String
            },
            onSelectDay: {
                type: Function
            }
        },
        created(){},
        methods : {
            inputBlurHandler(event){
                const date = this.day.date.valueOf()
                const price = event.target.value
//                console.log('input price', price)
                this.onEditPrice({date, price})
            },
            handleDate(date) {
                let result = date.format('D')
                return result
            },
            selectDay(){
                this.onSelectDay(this.day)
            },
            getState() {
                const status = {
                    disabled: false,
                    used: false
                }
                const self = this
                const state = self.day.state
                if(state == 0 || state == 3) {
                    console.log('')
                } else if(state == 1) {
                    status.used = true
                } else if(state == 4) {
                    status.disabled = true
                } else {
//                    console.log('error state ')
                }
                return status
            }
        }
    }
</script>
<style>
    .day-cell {
        flex: 1;
        width: 80px;
        min-height: 60px;
        /* 非当前月背景 */
        background-color: #F9F9F9;
    }

    .day-number {
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        /* 非当前月颜色 */
        color: rgba(0, 0, 0, .5);
    }

    .current-month {
        background: #fff;
    }

    .current-month .day-number {
        color: #222222;
    }

    .selected-day{
        background-color: rgb(48, 137, 219);
    }

    .selected-day .day-number {
        color: #FFFFFF;
    }

    .today {
        border: 1px solid rgb(48, 137, 219);
    }
    .today.selected-day {
        border: 1px dashed #fff;
    }
    .state-gray {
        background: #d7d7d7;
    }

    .state-orange {
        background: #FCC459;
    }
    .day-price-input {
        box-sizing: border-box;
        background-color: transparent;
        border: none;
        width: 85px;
        height: 30px;
        padding: 2px;
    }
    .day-price-input:hover {
        border: solid 1px darkgray;
    }

    .day-cell .ivu-input {
        width: 70px;
        height: 25px;
        line-height: 20px;
        font-size:14px;
        border: none;
    }
</style>
