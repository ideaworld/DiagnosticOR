/* author: Bowen */
var api_url = 'http://genomics-advisor.smartplatforms.org:2048/api';
var client_id = 'b66eb22c-88aa-4d20-8894-4dadf31e2b24';
var auth_url = 'http://genomics-advisor.smartplatforms.org:2048/auth';
var redirect_uri = 'http://localhost:8101/redirect';
var client_secret = 'b1a1bf4c-4612-4a14-ba7b-93d2cf7fd620';
var genomic_scope = 'user/read.Observation';
var clinical_client_id = '8b42b81b-486b-421c-afc3-6140795e7053';
var clinical_register_token = 'eyJhbGciOiJSUzI1NiJ9.eyJhdWQiOlsiZDhmZjI1YzctNWQxOC00MjVkLWIxNjEtMGZlMDE4NjYyOTVlIl0sImlzcyI6Imh0dHBzOlwvXC9hdXRob3JpemUtZHN0dTIuc21hcnRoZWFsdGhpdC5vcmdcLyIsImp0aSI6IjJhZGFlZmRhLTcwNTYtNGQ2ZS1iOGI5LTJhZmYwY2EyMmU3YSIsImlhdCI6MTQ0OTAzNzcxNX0.pN9GPRqSEMuCKre1QlnE91fVFlJJkApU7ZCaDJIOZnPzYTG89XseoGy4vn-6BfZYK-_rL-PVpHiFZOks4X1iyj6hJjisV9SW8jE4QUV4h8OCzblhknsnTLqFeF8obg-Ywv3px103UxE1Tok35YjBioytBF7PgQLKXR0ZzzHMWWQ';
var clinical_client_secret = 'AKfU3mMT0rtopgk2Kuset-0nbwWGEzqZLgZP1cdx3_nmB9uj-PbItb2GOr5vPzkg84Kgkd8iKQovKC7Nebd9JaU';
var clinical_redirect_uri = redirect_uri;
var clinical_launch_uri = '/fhir-app/launch.html';
var clinical_auth_uri = 'http://guidance.site:4000/api/oauth/authorize';
var clinical_token_uri = 'http://guidance.site:4000/api/oauth/token';
var clinical_api_uri = 'https://fhir-api-dstu2.smarthealthit.org/api/';
var clinical_state = 'eahub8';
var regi_token = 'eyJhbGciOiJSUzI1NiJ9.eyJhdWQiOlsiMjNlNjU5MjctNzUwYS00NGFiLWFjOTktMjg4YzliZDEyNzlkIl0sImlzcyI6Imh0dHBzOlwvXC9hdXRob3JpemUtZHN0dTIuc21hcnRoZWFsdGhpdC5vcmdcLyIsImp0aSI6ImI2MWM3NDc4LWI4ZDEtNDdiNS05MDkxLTRlZjgyMDBkMDliNyIsImlhdCI6MTQ4MTE0MjYzMH0.PRy9n82MAzzJ-FV7H--wAVzMvqiCFtAKaRMBouZsT7qE5e8P76boE-gJw3GLcgkSzsNT04I8bBfB_aGBNomgZ9tuhMbchn9XW5_AHnRGyKa3xqTHoVuyi1-eO8GRJCXm4VH8HGktPXLL3PXJ_gWLrE2e43ciOISvTMtOnhwlLPM';


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
	clinical_api_uri:clinical_api_uri,
	clinical_state:clinical_state
}
