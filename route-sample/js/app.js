'use strict';

const move = {
    home: () => {
        m.route('/')
    },
    dashboard: () => {
        const name = Home.vm.prof.name();
        const age = Home.vm.prof.age();
        m.route('/dashboard/' + name + '/' + age)
    }
};

const myProf = function() {
    this.name = m.prop('');
    this.age = m.prop('');
};

const Home = {
    vm: (function() {
        const vm = {};
        vm.init = function() {
            vm.prof = new myProf();
            vm.prof.name('hemdal');
            vm.prof.age('100');
        }
        return vm
    })(),

    controller: function() {
        Home.vm.init();
    },

    view: () => {
        return [
            m('div', 'なんちゃって登録画面'),
            m('div', '名前と年齢を入力してください。'),
            m('p',
                m('input[placeholder="名前を入力してください"]', {
                    onkeyup: m.withAttr('value', Home.vm.prof.name),
                    value: Home.vm.prof.name()
                })
            ),
            m('p',
                m('input[type="number"][placeholder="年齢を入力してください"]', {
                    onkeyup: m.withAttr('value', Home.vm.prof.age),
                    value: Home.vm.prof.age()
                })
            ),
            m('button', {
                onclick: move.dashboard
            }, '登録')
        ]
    }
};

const Dashboard = {
    view: () => {
        return [
            m('div', '登録結果'),
            m('div', 'あなたのプロフィールは、以下ですね？'),
            m('div', '名前は' + m.route.param("name")),
            m('div', '歳は' + m.route.param("age")),
            m('button', {
                onclick: move.home
            }, '登録画面へ')
        ]
    }
};

//初回起動をHomeに設定。他のページも設定。
m.route(document.getElementById('root'), '/', {
    '/': Home,
    '/dashboard/:name/:age': Dashboard
});
