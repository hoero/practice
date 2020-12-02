<template>
    <div class="container">
        <form v-if="!submitted">
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <!-- Exercise 1 -->
                    <!-- Create a Signup Form where you retrieve the following Information -->
                    <!-- Full Name (First Name + Last Name) -->
                    <!-- Mail -->
                    <!-- Password -->
                    <!-- Store Data? Yes/No -->

                    <!-- Exercise 2 -->
                    <!-- Only display the Form if it has NOT been submitted -->
                    <!-- Display the Data Summary ONCE the Form HAS been submitted -->

                    <!-- Exercise 3 -->
                    <!-- Edit the Example from above and create a custom "Full Name" Control -->
                    <!-- which still holds the First Name and Last Name Input Field -->
                    <!-- <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" class="form-control" id="name" v-model.lazy="name" />
                    </div>-->
                    <name :name="firstName" v-model="firstName">First Name</name>
                    <name :name="lastName" v-model="lastName">Last Name</name>
                    <div class="form-group">
                        <label for="email">Mail</label>
                        <input type="email" class="form-control" id="email" v-model.lazy="mail" />
                    </div>
                    <div class="form-group">
                        <label for="password">Pasword</label>
                        <input
                            type="password"
                            class="form-control"
                            id="password"
                            v-model.lazy="password"
                        />
                    </div>
                    <div class="form-group">
                        <label>Store in Database?</label>
                        <label for="yes">
                            <input type="radio" id="yes" value="Yes" v-model="stored" />Yes
                        </label>
                        <label for="no">
                            <input type="radio" id="no" value="No" v-model="stored" />No
                        </label>
                    </div>
                    <button class="btn btn-primary" @click.prevent="submit">Submit</button>
                </div>
            </div>
        </form>
        <div class="row" v-else>
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4>Your Data</h4>
                    </div>
                    <div class="panel-body">
                        <p>Full Name: {{ firstName }} {{ lastName }}</p>
                        <p>Mail: {{ mail }}</p>
                        <p>Password: {{ password }}</p>
                        <p>Store in Database?: {{ stored }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Name from './components/Name';

export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            mail: '',
            password: '',
            stored: 'No',
            submitted: false
        };
    },
    methods: {
        submit() {
            this.submitted = true;
        },
        changed(val) {
            this.name = val;
        }
    },
    components: { Name }
};
</script>

<style>
</style>
