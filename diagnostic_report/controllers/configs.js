/* author: Bowen */
var api_url = 'http://genomics-advisor.smartplatforms.org:2048/api';
var client_id = '09ca3793-6b29-4f4e-a2a6-210261f6d104';
var auth_url = 'http://genomics-advisor.smartplatforms.org:2048/auth/authorize?';
var redirect_uri = 'http://localhost:8001/recv_redirect/';
var client_secret = 'b1a1bf4c-4612-4a14-ba7b-93d2cf7fd620';
var genomic_scope = 'user/read.Observation';
var clinical_client_id = '995c70fd-790a-462c-a84c-e34bcd316b0d';
//var clinical_register_token = 'eyJhbGciOiJSUzI1NiJ9.eyJhdWQiOlsiZDhmZjI1YzctNWQxOC00MjVkLWIxNjEtMGZlMDE4NjYyOTVlIl0sImlzcyI6Imh0dHBzOlwvXC9hdXRob3JpemUtZHN0dTIuc21hcnRoZWFsdGhpdC5vcmdcLyIsImp0aSI6IjJhZGFlZmRhLTcwNTYtNGQ2ZS1iOGI5LTJhZmYwY2EyMmU3YSIsImlhdCI6MTQ0OTAzNzcxNX0.pN9GPRqSEMuCKre1QlnE91fVFlJJkApU7ZCaDJIOZnPzYTG89XseoGy4vn-6BfZYK-_rL-PVpHiFZOks4X1iyj6hJjisV9SW8jE4QUV4h8OCzblhknsnTLqFeF8obg-Ywv3px103UxE1Tok35YjBioytBF7PgQLKXR0ZzzHMWWQ';
var clinical_client_secret = 'APUgNxycgDIlkw0H4vbXsJBWc3mQ4u_je415rYqTnSSXsDCj83GMK926UyCKx4iu6M-xOES3xgZavUzxYnsgyUg';
var clinical_redirect_uri = 'http://localhost:8001/';
var clinical_launch_uri = 'http://localhost:8001/fhir-app/launch.html';
var clinical_auth_uri = 'https://authorize-dstu2.smarthealthit.org/authorize';
var clinical_token_uri = 'https://authorize-dstu2.smarthealthit.org/token';
var clinical_api_uri = 'https://fhir-api-dstu2.smarthealthit.org'
var clinical_register_token = 'eyJhbGciOiJSUzI1NiJ9.eyJhdWQiOlsiOTk1YzcwZmQtNzkwYS00NjJjLWE4NGMtZTM0YmNkMzE2YjBkIl0sImlzcyI6Imh0dHBzOlwvXC9hdXRob3JpemUtZHN0dTIuc21hcnRoZWFsdGhpdC5vcmdcLyIsImp0aSI6IjQ1ZTkzNjY3LTM5MDAtNDc2Ni04NGJmLTdmMDcwNGYyZGVlYyIsImlhdCI6MTQ1Mjc2OTYwMn0.oBFUyihll0RXsC8DIcwMw8aOcZF9202qPAWo08fMxTPsu16UyjnEhZu3weeHD9pDYKTEhmSJepH-pE3BnggTr9zZrxIg3KPJkvcOIf0NPRcGIsS-_RnlnBRiu02dSfA3a3AVpCSsv9XC2C9sAl1sB488xLecouMMOmXKy8WeWv0';

module.exports = {
	api_url: api_url,
	client_id : client_id,
	auth_url: auth_url,
	redirect_uri: redirect_uri,
	client_secret: client_secret,
	genomic_scope:genomic_scope,
	clinical_client_secret: clinical_client_secret,
	clinical_client_id:clinical_client_id,
	clinical_register_token:clinical_register_token,
	clinical_redirect_uri:clinical_redirect_uri,
	clinical_launch_uri:clinical_launch_uri,
	clinical_auth_uri:clinical_auth_uri,
	clinical_token_uri:clinical_token_uri,
	clinical_api_uri:clinical_api_uri
}
