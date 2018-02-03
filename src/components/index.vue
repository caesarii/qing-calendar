<template>
    <div>
        <Modal
            v-model="modalStatus"
            width="640px"
            title="选择日期"
        >
                <div v-if="loading" class="loading">{{loadingText}}</div>
                <div v-else>
                    <calendar-header :current-month="currentMonth"
                                     :first-day="firstDay"
                                     :current-date="currentDate"
                    >
                    </calendar-header>

                    <div class="full-calendar-body">
                        <div class="weeks">
                            <strong class="week" v-for="dayIndex in 7" v-bind:key="dayIndex">{{ (dayIndex - 1) | weekDayName(dayIndex) }}</strong>
                        </div>

                        <div class="dates" ref="dates">
                            <week v-for="(week, index) in weeks"
                                  :firstDay="firstDay"
                                  :mode="calendarMode"
                                  :key="index"
                                  :week="week"
                                  :onSelectDay="onSelectDay"
                                  :onEditPrice="onEditPrice"
                            >
                            </week>
                        </div>
                    </div>
                    <div class="calendar-tips">
                        {{tipText}}
                    </div>
                </div>
                <div slot="footer">
                    <div class="calendar-btn calendar-btn-reset" v-if="hasBackBtn" @click="backTo">上一步</div>
                    <div :class="{'calendar-btn':true, 'calendar-btn-ok':true, 'calendar-btn-disabled':okBtnDisabled}" @click="ok">确定</div>
                </div>
        </Modal>
    </div>
</template>
<script>
    import moment from 'moment';
//    import {CHANGE_MONTH} from './actions';
    import CalendarHeader from './components/Header.vue'
    import Week from './components/Week.vue'

    export default {
        props: [
            'mode',
            'onBack',
            'onOk',
            'onCancel'
        ],
        data () {
            return {
                firstDay: 0,
                calendarMode: this.mode,
                loading: false,
                // 返回按钮
                hasBackBtn: false,
                loadingText: '加载中',
                error: null,
                currentMonth: moment().startOf('month'),
                currentDate: moment(),
                selectedDays: [],
                priceList: [],
                weeks: [],
                modalStatus: true,
                tipText: '',
                okBtnDisabled: false,
            }
        },
        components: {
            CalendarHeader,
            Week,
        },
        computed: {
            calendarTitle() {
                return this.title
            }
        },
        methods: {

            backTo() {
                this.onBack()
            },
            ok() {
                const self = this
                if(self.okBtnDisabled === true) {
                    return
                }

//                console.log('price', self.priceList)
                // 元变分
//                const prices = self.priceList.map(day => {
//                    day.price = String(Number(day.price) * 100)
//                    return day
//                })
                self.onOk(self.priceList)

                // 数据提交到表单后清空
                self.priceList = []
            },
            onSelectDay() {
            },
            onEditPrice(day) {
                const self = this
                const {date, price} = day

                // 修改已有项
                const len = self.priceList.length
                for(let i = 0; i < len; i++) {
                    const curr = self.priceList[i]
                    if(curr.date === date) {
                        if(price === "" || price === undefined) {
                            // 删除该项
                            self.priceList.splice(i, 1)
                        } else {
                            curr.price = price
                        }
                        return
                    }
                }
                // 添加新项
                if(price !== '') {
                    self.priceList.push(day)
                }
            },
//            fetchPriceOfDate() {
//                const id = this.$route.query.location_id
//
//                const weeks = this.getWeeks()
//                let start = null
//                let currentMonth = this.currentMonth
//                let nowMonth = moment().startOf('Month')
//                let today = moment().valueOf()
//                if(currentMonth.isSame(nowMonth)) {
//                    // 当前月
//                    start = today
//                } else {
//                    // 非当前月
//                    start = weeks[0][0].date.valueOf()
//                    // 特殊清空: 下一个 view 的开始可能位于 今天 之前
//                    if(start < today) {
//                        start = today
//                    }
//                }
//                const end = weeks[4][6].date.valueOf()
//                const args = {
//                    ad_location_id: id,
//                    start,
//                    end,
//                }
//                Requester.get(API.getPriceOfDate, {params: args}).then(data => {
//                    this.loading = false
//                    for(let row = 0; row < 5; row ++) {
//                        for(let col = 0; col < 7; col++) {
//                            // 组合日期列表和日期 state
//                            const curr = weeks[row][col]
//                            const currVal = curr.date.valueOf()
//                            if(currVal in data) {
//                                curr.state = data[currVal].state
////                                console.log('price', data[currVal].price)
//
//                                // 分变元
//                                const  p = data[currVal].price
//                                curr.price = p ? Number(p / 100) : undefined
////                                this.priceList.push({date: currVal, price: data[currVal].price})
//                                // 今天以及之后 and state = 正常/已设置
//                                if(curr.isToday || curr.date.isAfter(moment())) {
//                                    if(curr.state != 2) {
//                                        curr.editable = true
//                                    }
//                                }
//                            } else {
//                                curr.state = -1
//                            }
//
////                            // 组合日期列表与已选择状态
////                            //                            const currValue = Number(curr.date.valueOf())
////                            if(already.indexOf(currVal) > -1 ) {
////                                curr.isSelected = true
////                            }
//                        }
//                    }
//                    this.weeks = weeks
//
//                }).catch(e => {
//                    catchError(e)
//                })
//            },

            getWeeks () {
                let startOfPage = this.getMonthViewStartDate(this.currentMonth, this.firstDay);
                let weeks = []
                let week = []

                // 当前月天数
                let lenOfMonth = this.currentMonth.daysInMonth();

                const curr = startOfPage
//                console.log('start of page', curr.format())
                for ( let weekIndex=0; weekIndex < 5; weekIndex++) {
                    week = [];
                    for (let dayIndex=0; dayIndex < 7; dayIndex++) {
                        const day = this.getDayObject(curr, dayIndex)
//                        day.date.add(1, 'day')

                        // 合并价格
                        const currVal = day.date.valueOf()
                        const already = {}
                        this.priceList.forEach(o => {
                            already[o.date] = o.price
                        })
//                        console.log('already', already)
                        if(currVal in already) {
                            day.price = already[currVal]
                        }

                        if(day.isToday) {
                            this.currentDate = day.date
                        }

                        week.push(day);
                        curr.add(1, 'day');
                    }
                    weeks.push(week);
                }


//                console.log(weeks)
                const lastDay =  weeks[4][6].date.format()
                let diff = lenOfMonth - lastDay
//                console.log('diff', lenOfMonth, lastDay)

                if(diff > 0 && diff < 3){
                    week = [];
                    for (let dayIndex=0; dayIndex < 7; dayIndex++) {

                        week.push(this.getDayObject(startOfPage, dayIndex));

                        startOfPage.add(1, 'day');
                    }
                    weeks.push(week);
                }
                return weeks;
            },

            getMonthViewStartDate (currMonth, firstDay) {
                // 从周一开始
                firstDay = parseInt(firstDay);

                // 本月第一天
                let start = moment(currMonth)
//                console.log('start', start)
                let startOfMonth = moment(start.startOf('month'));
//                console.log('start of month', startOfMonth)

                // 本月第一天是周几
                const dayOfMonth = startOfMonth.day()
//                console.log('day of month',dayOfMonth)

                // 视图第一天
                start.subtract(dayOfMonth, 'days');
//                console.log('start of view', start)

                if (dayOfMonth < firstDay) {
                    start.subtract(7, 'days');
                }

                // 视图第一天
                start.add(firstDay, 'days');
                return start;

//                firstDay = parseInt(firstDay); // 1
//                let start = moment(currMonth) //.add(1, 'day')
//                let startOfMonth = moment(start.startOf('month'));
//                start.subtract(startOfMonth.day(), 'days');
//                if (startOfMonth.day() < firstDay) {
//                    start.subtract(7, 'days');
//                }
//                start.add(firstDay, 'days');
//                return start;
            },

            getDayObject(currDay, dayIndex){

                const day = {
                    isToday: currDay.isSame(moment(), 'day'),
                    isCurrentMonth: currDay.isSame(this.currentMonth, 'month'),
                    weekDay: dayIndex,
                    isWeekEnd: (dayIndex === 5 || dayIndex === 6),
                    date: moment(currDay),
                    isSelected: false,
                    editable: false,
                }
                // TODO 此处与 fetch 中冗余
                if(day.isToday || currDay.isAfter(moment())) {
                        day.editable = true
                }
                return day;
            },


        },
        filters: {
            weekDayName (weekday) {
//                console.log('weekday', weekday)
                const weeks = ['日', '一', '二', '三', '四', '五', '六', ]
                return weeks[weekday]
            }
        },
        created() {
//            let self = this;
//            this.$root.$on(CHANGE_MONTH, function (payload) {
//                self.currentMonth = payload;
////                self.weeks = self.getWeeks()
//                self.fetchPriceOfDate()
//            });
//
//            if(self.mode === 'price_create') {
////                console.log('price_create')
//                this.hasBackBtn = true
//                self.weeks = self.getWeeks()
//            } else if(self.mode === 'price_edit') {
////                console.log('edit')
//                this.hasBackBtn = true
//                this.fetchPriceOfDate('price_edit')
//            } else if(self.mode === 'price_detail') {
//                this.hasBackBtn = false
//                this.fetchPriceOfDate('price_detail')
//            }

        },
    }

</script>
<style>
    .loading {
        text-align: center;
    }
    ul, p {
        margin: 0;
        padding: 0;
    }

    .full-calendar-body {
        margin-top: 20px;
    }
    .weeks {
        /*display: flex;*/
        border-top: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
        border-left: 1px solid #e0e0e0;
    }
    .week {
        display: inline-block;
        width: 86px;
        height: 30px;
        line-height: 30px;
        /*flex: 1;*/
        text-align: center;
        /*border-right: 1px solid #e0e0e0;*/
        background: #E8E8E8;
        font-size: 16px;
        color: #666666;
    }

    .dates {
        position: relative;
    }

    .date-select-btn {
        /*margin: 20px 0 10px;*/
        background: #D5434E;
        width: 245px;
        height: 48px;
        line-height:48px;
        border: 1px solid #E8E8E8;
        border-radius: 8px;
        text-align: center;
        font-size: 14px;
        color: #fff;

    }

    .calendar-btn {
        margin: 20px;
        margin-top: 0;
        display: inline-block;
        width: 240px/*260px*/;
        height: 42px;
        border-radius: 8px;
        line-height: 42px;
        text-align: center;
        font-size: 14px;
    }
    .calendar-btn-reset {
        background: #D5434E;
        color: #FFFFFF;

    }
    .calendar-btn-ok {
        background: #D5434E;
        color: #FFFFFF;
    }

    .calendar-btn-disabled {
        background: rgb(232, 232, 232);
    }

    .calendar-tips {
        height: 20px;
        margin-top: 15px;
        line-height: 20px;
        text-align: center;
        font-size: 14px;
        color: #000000;
    }
</style>
