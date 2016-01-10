/* author: Bowen */
var api_url = 'http://localhost:2048/api';
var client_id = '9965c51f-495a-42aa-a0db-5949cde2bc95';
var auth_url = 'http://localhost:2048/auth';
var redirect_uri = 'http://localhost:8001/recv_redirect/';
var client_secret = 'b1a1bf4c-4612-4a14-ba7b-93d2cf7fd620';
var genomic_scope = 'user/read.Observation';
var clinical_client_id = 'd8ff25c7-5d18-425d-b161-0fe01866295e';
var clinical_register_token = 'eyJhbGciOiJSUzI1NiJ9.eyJhdWQiOlsiZDhmZjI1YzctNWQxOC00MjVkLWIxNjEtMGZlMDE4NjYyOTVlIl0sImlzcyI6Imh0dHBzOlwvXC9hdXRob3JpemUtZHN0dTIuc21hcnRoZWFsdGhpdC5vcmdcLyIsImp0aSI6IjJhZGFlZmRhLTcwNTYtNGQ2ZS1iOGI5LTJhZmYwY2EyMmU3YSIsImlhdCI6MTQ0OTAzNzcxNX0.pN9GPRqSEMuCKre1QlnE91fVFlJJkApU7ZCaDJIOZnPzYTG89XseoGy4vn-6BfZYK-_rL-PVpHiFZOks4X1iyj6hJjisV9SW8jE4QUV4h8OCzblhknsnTLqFeF8obg-Ywv3px103UxE1Tok35YjBioytBF7PgQLKXR0ZzzHMWWQ';
var clinical_client_secret = 'AKfU3mMT0rtopgk2Kuset-0nbwWGEzqZLgZP1cdx3_nmB9uj-PbItb2GOr5vPzkg84Kgkd8iKQovKC7Nebd9JaU';
var clinical_redirect_uri = 'http://localhost:8001/';
var clinical_launch_uri = 'http://localhost:8000/fhir-app/launch.html';
var clinical_auth_uri = 'https://authorize-dstu2.smarthealthit.org/authorize';
var clinical_token_uri = 'https://authorize-dstu2.smarthealthit.org/token';
var clinical_api_uri = 'https://fhir-api-dstu2.smarthealthit.org'


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
