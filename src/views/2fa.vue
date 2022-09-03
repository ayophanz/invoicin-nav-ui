<template>
    <form @submit.prevent="onVerify">
        <input v-model="otp" type="text">
        <button type="submit">Authenticate</button>
    </form>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue';
import accountService from '../services/account';

export default defineComponent({
    setup() {
        const otp = ref(''); 

        const onVerify = () => {
            const data = { 'one_time_password': otp.value };
            accountService.twofa(data)
            .catch((error) => {
                console.log(error);
            });
        }

        return {
            otp,
            onVerify
        }
    }
});
</script>