import { NgModule } from '@angular/core'; 
import { ApolloBoostModule, ApolloBoost } from 'apollo-angular-boost';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  exports: [
    HttpClientModule,
    ApolloBoostModule
  ]
})
export class GraphQLModule {
  constructor(
    apolloBoost: ApolloBoost
  ) {
    apolloBoost.create({
      onError: (({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.map(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
        if (networkError) 
          console.log(`[Network error]: ${networkError.message}`);
          networkError['error']['errors'].map(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
      }),
      uri: 'https://us-central1-new-epam.cloudfunctions.net/graphql'
    })
  }
}
