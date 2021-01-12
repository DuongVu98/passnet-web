// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	recruitmentApi: "http://192.168.99.100:8080",
	authenticationApi: "http://13.72.86.164:1323",
	firebaseConfig: {
		apiKey: "AIzaSyBiaLJvzLZPpGTgg19DYxpkQrkOAhA6bcQ",
		authDomain: "passnet-auth.firebaseapp.com",
		databaseURL: "https://passnet-auth.firebaseio.com",
		projectId: "passnet-auth",
		storageBucket: "passnet-auth.appspot.com",
		messagingSenderId: "576345510227",
		appId: "1:576345510227:web:5df5c16c12118da43dd1a6",
		measurementId: "G-2FEJGPSS36",
	},
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
