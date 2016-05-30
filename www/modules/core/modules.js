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
                templateUrl: 'modules/menu/menu.tmpl.html',
                controller: function() {}
            })
            .state('app.map', {
                url: '/map',
                views: {
                    'viewContent': {
                        templateUrl : 'modules/map/map.tmpl.html',
                        controller  : 'MapController as vm',

                    },
                    'fabContent': {
                        templateUrl : 'modules/map/fab.tmpl.html',
                        controller  : 'MapFabButtonController as vm'

                    }
                }
            })

        .state('app.search', {
                url: '/buscar',
                views: {
                    'viewContent': {
                        'templateUrl': 'modules/search/search.tmpl.html',
                        controller: 'SearchController as vm'
                    },
                    'fabContent': ''
                }
            })
            .state('app.detail', {
                url: '/detalle/:paradaID',
                views: {
                    'viewContent': {
                        'templateUrl': 'modules/detail/detail.tmpl.html',
                        controller: 'DetailController as vm'
                    },
                    'fabContent': ''
                }
            })


        .state('app.wizard', {
                url: '/asistente',
                views: {
                    'viewContent': {
                        templateUrl: 'modules/wizard/wizard.tmpl.html'
                    },
                    'fabContent': ''
                }

            })
            .state('app.wizard.step1', {
                url: '/paso1',
                views: {
                    'step-view': {
                        templateUrl: 'modules/wizard/step1/step1.tmpl.html',
                        controller: 'WizardStepOneController as vm'
                    }
                }
            })
            .state('app.wizard.step2', {
                url: '/paso2',
                views: {
                    'step-view': {
                        templateUrl: 'modules/wizard/step2/step2.tmpl.html',
                        controller: 'WizardStepTwoController as vm'
                    }
                }
            })
            .state('app.wizard.step3', {
                url: '/paso3',
                views: {
                    'step-view': {
                        templateUrl: 'modules/wizard/step3/step3.tmpl.html',
                        controller: 'WizardStepThreeController as vm'
                    },
                    'step-three-overlay': {
                        templateUrl :'modules/wizard/step3/overlay.tmpl.html',
                        controller  : 'WizardStepThreeOverlayController as vm' 
                    },
                    'step-three-fab': {
                        templateUrl :'modules/wizard/step3/fab.tmpl.html',
                        controller  : 'WizardStepThreeFabController as vm' 
                    }
                }
            })
            .state('app.wizard.lastStep', {
                url: '/confirmacion',
                views: {
                    'step-view': {
                        templateUrl: 'modules/wizard/last/last.tmpl.html',
                        controller: 'WizardLastStepController as vm'
                    },
                    'step-three-fab': ''
                }
            })
            .state('login', {
                'url': '/login',
                'templateUrl': 'modules/login/login.tmpl.html',
                'controller': 'LoginController as vm'
            })
            // .state('map', {
            //   'url': '/map',
            //   'templateUrl': 'modules/map/map.tmpl.html',
            //   'controller': 'MapController as vm'
            // })
            // .state('search', {
            //   'url': '/search',
            //   'templateUrl': 'modules/search/search.tmpl.html',
            //   'controller': 'SearchController as vm'
            // })
            // .state('detail', {
            //   'url': '/detail',
            //   'templateUrl': 'modules/detail/detail.tmpl.html',
            //   'controller': 'DetailController as vm'
            // })
            // .state('wizard', {
            //   url: '/wizard',
            //   abstract:true,
            //   templateUrl: 'modules/wizard/wizard.tmpl.html'
            // })
            // .state('wizard.step1', {
            //   url: '/step1',
            //   views: {
            //     'step-view': {
            //       templateUrl: 'modules/wizard/step1/step1.tmpl.html',
            //       controller: 'WizardStepOneController as vm'
            //     }
            //   }
            // })
            // .state('wizard.step2', {
            //   url: '/step2',
            //   'views': {
            //     'step-view': {
            //       'templateUrl': 'modules/wizard/step2/step2.tmpl.html',
            //       controller : 'WizardStepTwoController as vm'
            //     }
            //   }
            // })
            // .state('wizard.step3', {
            //   'url': '/step3',
            //   'views': {
            //     'step-view': {
            //       'templateUrl': 'modules/wizard/step3/step3.tmpl.html',
            //       controller :'WizardStepThreeController as vm'
            //     }
            //   }
            // })
        ;
    });
