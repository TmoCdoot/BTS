<template>
    <div>
        <canvas id="planet-chart"></canvas>
    </div>
</template>

<script>
    import { Chart, LineController } from 'chart.js'
    import statChart from '@/plug-in/statChart.js'

    Chart.register(LineController)

    export default {
        name: 'StatChart',
        data() {
            return {
                statChart: statChart
            }
        },
        mounted() {
            const ctx = document.getElementById('planet-chart');
            new Chart(ctx, statChart);
        }
    }
</script>
