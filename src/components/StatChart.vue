<template>
    <div>
        <column-chart :data="chartDataDly" :colors="['#EF4E2A']" class="graph" height="240px"></column-chart>
    </div>
</template>

<script>
    export default {
        name: 'StatChart',
        data() {
            return {
                chartDataDly: {
                    'Mon': 1,
                    'Tue': 4,
                    'Wen': 3,
                    'Thu': 4,
                    'Fri': 3,
                    'Sat': 4,
                    'Sun': -3,
                },
                chartDataWky: {

                },
                chartDatatMty: {
                    'Dec': 3,
                    'Nov': 2,
                    'Oct': 8,
                    'Sep': 4,
                    'Aug': 3,
                    'Jui': 2,
                    'Jun': 8,
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    .graph {
        border: 1px solid blue;
    }
</style>
