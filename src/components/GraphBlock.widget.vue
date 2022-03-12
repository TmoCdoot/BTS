<template>
    <div>
        <div v-if="graph == 'dly'">
            <area-chart :data="chartDataDly" :colors="['#479EDD']" class="graph" label="PNL réaliser"></area-chart>
        </div>
        <div v-if="graph == 'wky'">
            <area-chart :data="chartDataWky" :colors="['#479EDD']" class="graph" label="PNL réaliser"></area-chart>
        </div>
        <div v-if="graph == 'mty'"> 
            <area-chart :data="chartDatatMty" :colors="['#479EDD']" class="graph" label="PNL réaliser"></area-chart>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'GraphBlock',
        props: {
            graph: String,
        },
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
                    '29/05': 14,
                    '22/28': 10,
                    '15/21': -1,
                    '8/14': -5,
                    '1/7': 1,
                    '25/31': 4,
                    '18/24 ': 3,
                },
                chartDatatMty: {
                    'Dec': 3,
                    'Nov': 2,
                    'Oct': 8,
                    'Sep': 4,
                    'Aug': 3,
                    'Jui': -1,
                    'Jun': -4,
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    .graph {
        /* border: 1px solid blue; */
    }
</style>
