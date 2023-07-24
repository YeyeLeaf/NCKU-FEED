<script setup>
import { GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const signIn = async () => {
    const provider = await new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const additionalUserInfo = getAdditionalUserInfo(result);
        const isNewUser = additionalUserInfo.isNewUser;
        const user = result.user;
        console.log(JSON.stringify(user))
        // TODO: send user object to backend api, user's data can be retrieve from user object
        if (isNewUser) {
            // Add to database and go to preference page -> fetch POST api
        } else {
            // fetch login api and get jwt token -> fetch GET api
        }
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // error handling
    });
};

</script>

<template>
    <footer class="bg-[#525252] 
                    inset-x-0 
                    bottom-0 
                    lg:h-20 
                    h-28
                    flex
                    font-montserrat 
                    text-white
                    footer">
        <div class=" mx-auto
                    items-top
                    lg:items-center   
                    flex
                    flex-row
                    text-lg
                    lg:text-base
                    transition-all 
                    lg:space-x-32">
                <h1 class="font-bold pt-6 lg:pt-0 text-base"><a href="#">Feedback</a></h1>
                <a href="#" class="lg:hidden mx-8">
                    <picture>
                        <img src="../assets/nckufeed_white.svg" class="h-20">
                    </picture>
                </a>
                <h1 class="font-bold pt-6 lg:pt-0"><a href="#">Contact us</a></h1>
                <h1 class="font-bold hidden lg:block"><a href="#">Instructions</a></h1>

                <!-- sign in example button here -->
                <!-- <button @click="signIn" style="background-color: aqua;">Sign In</button> -->
                <!-- <h1 class="text-sm opacity-80 lg:pt-0 pt-20">© NCKU FEED, 2022. We love our users!</h1> -->
        </div>
    </footer>

</template>

<style scoped>

</style>