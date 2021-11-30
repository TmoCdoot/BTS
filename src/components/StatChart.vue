<template>
    <div>
        <column-chart :data="chartData"></column-chart>
    </div>
</template>

<script>
    export default {
        name: 'StatChart',
        data() {
            return {
                chartData: {
                    'Mon': 1,
                    'Tue': 4,
                    'Wen': 3,
                    'Thu': 4,
                    'Fri': 3,
                    'Sat': 4,
                    'Sun': -3,
                }
            }
        },
    }
</script>
