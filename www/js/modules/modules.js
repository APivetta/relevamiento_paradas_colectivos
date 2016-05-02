'use strict';
angular.module('modules', [
        'ionic',
        'ngCordova',
        'ui.router',
        'ionMdInput',
        'leaflet-directive',
        'ionic-material',
        'ion-autocomplete'
        //'ionicMaterialInk',
        //'ionicMaterialMotion'

    ])
    .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $ionicConfigProvider.views.maxCache(0);


        // ROUTING with ui.router
        $urlRouterProvider.otherwise('/login');

        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'js/modules/menu/menu.tmpl.html',
                controller: function() {}
            })
            .state('app.map', {

                views: {
                    'viewContent': {
                        templateUrl : 'js/modules/map/map.tmpl.html',
                        controller  : 'MapController as vm',

                    },
                    'fabContent': {
                        templateUrl : 'js/modules/map/fab.tmpl.html',
                        controller  : 'MapFabButtonController as vm'

                    }
                }
            })

        .state('app.search', {
                url: '/buscar',
                views: {
                    'viewContent': {
                        'templateUrl': 'js/modules/search/search.tmpl.html',
                        controller: 'SearchController as vm'
                    },
                    'fabContent': ''
                }
            })
            .state('app.detail', {
                url: '/detail',
                views: {
                    'viewContent': {
                        'templateUrl': 'js/modules/detail/detail.tmpl.html',
                        controller: 'DetailController as vm'
                    },
                    'fabContent': ''
                }
            })


        .state('app.wizard', {
                url: '/asistente',
                views: {
                    'viewContent': {
                        templateUrl: 'js/modules/wizard/wizard.tmpl.html'
                    },
                    'fabContent': ''
                }

            })
            .state('app.wizard.step1', {
                url: '/paso1',
                views: {
                    'step-view': {
                        templateUrl: 'js/modules/wizard/step1/step1.tmpl.html',
                        controller: 'WizardStepOneController as vm'
                    }
                }
            })
            .state('app.wizard.step2', {
                url: '/paso2',
                views: {
                    'step-view': {
                        templateUrl: 'js/modules/wizard/step2/step2.tmpl.html',
                        controller: 'WizardStepTwoController as vm'
                    }
                }
            })
            .state('app.wizard.step3', {
                url: '/paso3',
                views: {
                    'step-view': {
                        templateUrl: 'js/modules/wizard/step3/step3.tmpl.html',
                        controller: 'WizardStepThreeController as vm'
                    }
                }
            })
            .state('app.wizard.lastStep', {
                url: '/confirmacion',
                views: {
                    'step-view': {
                        templateUrl: 'js/modules/wizard/last/last.tmpl.html',
                        controller: 'WizardLastStepController as vm'
                    }
                }
            })
            .state('login', {
                'url': '/login',
                'templateUrl': 'js/modules/login/login.tmpl.html',
                'controller': 'LoginController as vm'
            })
            // .state('map', {
            //   'url': '/map',
            //   'templateUrl': 'js/modules/map/map.tmpl.html',
            //   'controller': 'MapController as vm'
            // })
            // .state('search', {
            //   'url': '/search',
            //   'templateUrl': 'js/modules/search/search.tmpl.html',
            //   'controller': 'SearchController as vm'
            // })
            // .state('detail', {
            //   'url': '/detail',
            //   'templateUrl': 'js/modules/detail/detail.tmpl.html',
            //   'controller': 'DetailController as vm'
            // })
            // .state('wizard', {
            //   url: '/wizard',
            //   abstract:true,
            //   templateUrl: 'js/modules/wizard/wizard.tmpl.html'
            // })
            // .state('wizard.step1', {
            //   url: '/step1',
            //   views: {
            //     'step-view': {
            //       templateUrl: 'js/modules/wizard/step1/step1.tmpl.html',
            //       controller: 'WizardStepOneController as vm'
            //     }
            //   }
            // })
            // .state('wizard.step2', {
            //   url: '/step2',
            //   'views': {
            //     'step-view': {
            //       'templateUrl': 'js/modules/wizard/step2/step2.tmpl.html',
            //       controller : 'WizardStepTwoController as vm'
            //     }
            //   }
            // })
            // .state('wizard.step3', {
            //   'url': '/step3',
            //   'views': {
            //     'step-view': {
            //       'templateUrl': 'js/modules/wizard/step3/step3.tmpl.html',
            //       controller :'WizardStepThreeController as vm'
            //     }
            //   }
            // })
        ;
    });
