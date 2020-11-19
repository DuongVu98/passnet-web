import { NgModule } from "@angular/core";
import { Apollo, APOLLO_OPTIONS } from "apollo-angular";
import { HttpClientModule } from "@angular/common/http";
import { ApolloClientOptions, InMemoryCache } from "@apollo/client/core";
// import { HttpLink } from "apollo-angular/http";
import { environment } from "src/environments/environment";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";

const uri = `${environment.recruitmentApi}/query`;

// export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
// 	return {
// 		link: httpLink.create({ uri }),
// 		cache: new InMemoryCache(),
// 	};
// }

export function provideApollo(httpLink: HttpLink) {
	const basic = setContext((operation, context) => ({
		headers: {
			Accept: "charset=utf-8",
			skip: "true"
		},
	}));

	const link = ApolloLink.from([basic, httpLink.create({ uri })]);
	const cache = new InMemoryCache();

	return {
		link,
		cache,
	};
}

@NgModule({
	providers: [
		{
			provide: APOLLO_OPTIONS,
			useFactory: provideApollo,
			deps: [HttpLink],
		},
	],
	exports: [HttpClientModule, HttpLinkModule],
})
export class GraphQLModule {}
