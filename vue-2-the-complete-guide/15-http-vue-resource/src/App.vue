<template>
    <div class="container">
        <div class="row">
            <div
                class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
            >
                <h1>Http</h1>
                <div class="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="user.name"
                    />
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="user.email"
                    />
                </div>
                <button class="btn btn-primary" @click="submit">Submit</button>
                <hr />
                <input type="text" class="form-control" v-model="node" />
                <br /><br />
                <button class="btn btn-primary" @click="fetchData">
                    Get Data
                </button>
                <br />
                <br />
                <ul class="list-group">
                    <li
                        class="list-group-item"
                        v-for="u in users"
                        :key="u.name"
                    >
                        {{ u.name }} - {{ u.email }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                name: '',
                email: ''
            },
            users: [],
            resource: {},
            node: 'data'
        };
    },
    methods: {
        submit() {
            // this.$http.post('data.json', this.user).then(
            //     res => console.log(res),
            //     err => console.log(err)
            // );
            // this.resource.save({}, this.user);
            this.resource.saveAlt(this.user);
        },
        fetchData() {
            // this.$http
            //     .get('data.json')
            //     .then(res => res.json())
            //     .then(data => {
            //         const result = [];
            //         for (let key in data) result.push(data[key]);
            //         this.users = result;
            //     });
            this.resource
                .getData({ node: this.node })
                .then(res => res.json())
                .then(data => {
                    const result = [];
                    for (let key in data) result.push(data[key]);
                    this.users = result;
                });
        }
    },
    created() {
        const customActions = {
            saveAlt: { method: 'POST', url: 'alternative.json' },
            getData: { method: 'GET' }
        };
        this.resource = this.$resource('{node}.json', {}, customActions);
    }
};
</script>

<style></style>
