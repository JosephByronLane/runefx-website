variable "netlify_personal_access_token" {
  description = "PAT of the netlify account to mount hte project"
  type        = string
  sensitive = true  
}

variable "netlify_site_id" {
  description = "Site ID for the netlify site"
  type = string
  sensitive = true
}

variable "netlify_domain_url" {
  description = "The URL where the website will be accesible"
  type = string
  default = "runefx.org"
}


variable "cloudflare_api_token" {
  default = "API token for cloudflare provider"
  type = string
  sensitive = true
}
variable "cloudflare_zone_id" {
  default = "Zone ID for the cloudflare domain"
  type = string
  sensitive = true
}