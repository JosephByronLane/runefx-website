terraform {
  required_providers {
    netlify = {
      source = "registry.terraform.io/netlify/netlify"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~>4.25"
    }
  }
}

provider "netlify" {
  token = var.netlify_personal_access_token
}
provider "cloudflare" {
  api_token = var.cloudflare_api_token  
}

//
// NOTE: SITE DEPLOY MUST BE CREATED MANUALLY. YES I KNOW ITS ANNOYING
// BUT THE TERRAFORM PROVIDER DOESN'T SUPPORT CREATING SITES.
//

data "netlify_site" "rfx_netlify_site" {
  team_slug = "rfx-front"
  name      = "RuneFX"
  id = var.netlify_site_id
}

resource "netlify_site_domain_settings" "rfx_netlify_domain_settings" {
  site_id                      = data.netlify_site.rfx_netlify_site.id
  custom_domain                =  var.netlify_domain_url
}

resource "cloudflare_record" "cloudflare_rfx_site_dns_record" {
  zone_id = var.cloudflare_zone_id
  name    = "@"
  type = "CNAME"
  content = "apex-loadbalancer.netlify.com"
  proxied = true
  ttl     = 1
}


resource "cloudflare_record" "cloudflare_rfx_site_www_record" {
  zone_id = var.cloudflare_zone_id
  name    = "www"
  type = "CNAME"
  content = "rfx-site.netlify.app."
  proxied = true
  ttl     = 1
}