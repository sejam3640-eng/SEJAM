# Analytics Implementation Guide

## Overview

This guide covers analytics, tracking, and monitoring for SHAH JAM ACCESSORIES.

## Google Analytics Setup

### Installation:

```html
<!-- Add to <head> section of index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Key Metrics to Track:

1. **User Behavior**
   - Page views
   - Session duration
   - Bounce rate
   - User flow

2. **E-Commerce Events**
   - Product views
   - Cart additions
   - Checkout process
   - Conversions

3. **Traffic Sources**
   - Direct
   - Referral
   - Organic
   - Social media

### Implementation in JavaScript:

```javascript
// Track product view
function trackProductView(product) {
  gtag('event', 'view_item', {
    'items': [{
      'item_id': product.id,
      'item_name': product.name,
      'price': product.price,
      'item_category': product.category
    }]
  });
}

// Track add to cart
function trackAddToCart(product) {
  gtag('event', 'add_to_cart', {
    'items': [{
      'item_id': product.id,
      'item_name': product.name,
      'price': product.price,
      'quantity': 1
    }]
  });
}

// Track purchase
function trackPurchase(cartItems, total) {
  gtag('event', 'purchase', {
    'transaction_id': 'TRANS_' + Date.now(),
    'value': total,
    'currency': 'USD',
    'items': cartItems.map(item => ({
      'item_id': item.id,
      'item_name': item.name,
      'price': item.price,
      'quantity': item.quantity
    }))
  });
}
```

## Custom Events

### Track Form Submissions:
```javascript
function handleContactForm(event) {
  event.preventDefault();
  
  // Send event
  gtag('event', 'contact_form_submit', {
    'form_name': 'contact'
  });
  
  showNotification('Message sent successfully!');
  document.getElementById('contact-form').reset();
}
```

### Track Section Views:
```javascript
function setupScrollAnalytics() {
  const sections = document.querySelectorAll('section[id]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gtag('event', 'view_section', {
          'section': entry.target.id
        });
      }
    });
  }, { threshold: 0.5 });
  
  sections.forEach(section => observer.observe(section));
}
```

## User Segmentation

### Audience Segments:

1. **New Visitors**
   - First time on site
   - High bounce rate
   - Short session duration

2. **Returning Visitors**
   - Previous visits
   - Higher engagement
   - Likely purchasers

3. **Purchasers**
   - Completed transaction
   - Repeat customers
   - High value

### Implementation:
```javascript
// Set user ID
gtag('config', 'GA_MEASUREMENT_ID', {
  'user_id': userId,
  'custom_map': {
    'dimension1': 'customer_type',
    'metric1': 'lifetime_value'
  }
});
```

## Heatmap & Session Recording

### Using Hotjar:

```html
<script>
  (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:HOTJAR_ID,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');
    r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
```

## Conversion Tracking

### Goals to Track:

1. **Newsletter Signup** (Future)
   - Trigger: Form submission
   - Value: 5 points

2. **Product Purchase**
   - Trigger: Checkout completion
   - Value: Transaction amount

3. **Contact Form**
   - Trigger: Form submission
   - Value: 10 points

4. **Newsletter Click**
   - Trigger: Link click
   - Value: 1 point

## A/B Testing

### Using Google Analytics:

```javascript
// Implement A/B test variant
function getTestVariant() {
  const variants = ['control', 'variant_a', 'variant_b'];
  const userHash = CryptoJS.MD5(userId).toString();
  const index = parseInt(userHash, 16) % variants.length;
  return variants[index];
}

const testVariant = getTestVariant();
gtag('event', 'page_view', {
  'test_variant': testVariant
});
```

## Dashboard Setup

### Key Metrics Dashboard:

1. **Overview**
   - Daily users
   - Session duration
   - Bounce rate
   - Conversion rate

2. **Products**
   - Most viewed
   - Most purchased
   - Revenue by product
   - Average order value

3. **Funnel Analysis**
   - Product view → Add to cart
   - Add to cart → Checkout
   - Checkout → Purchase

4. **Traffic Source**
   - Direct
   - Referral
   - Organic
   - Social

## Email Integration (Future)

### Track Email Campaigns:

```javascript
// UTM parameters for email links
const emailTrackingURL = new URL('https://shahjamaccessories.com');
emailTrackingURL.searchParams.append('utm_source', 'email');
emailTrackingURL.searchParams.append('utm_medium', 'newsletter');
emailTrackingURL.searchParams.append('utm_campaign', 'spring_collection');
```

## Performance Monitoring

### Core Web Vitals:

```javascript
// Measure Core Web Vitals
web.vitals.getCLS(metric => console.log('CLS:', metric.value));
web.vitals.getFID(metric => console.log('FID:', metric.value));
web.vitals.getLCP(metric => console.log('LCP:', metric.value));
```

## Error Tracking

### Using Sentry:

```html
<script src="https://cdn.sentry.io/..." crossorigin="anonymous"></script>
<script>
  Sentry.init({
    dsn: "SENTRY_DSN",
    tracesSampleRate: 1.0
  });
</script>
```

## Data Privacy

### GDPR Compliance:

```javascript
// Get user consent
function getUserConsent() {
  const consent = localStorage.getItem('analytics_consent');
  if (!consent) {
    // Show consent banner
    // Store user choice
  }
}

// Honor opt-out
if (!userOptedOut) {
  gtag('config', 'GA_MEASUREMENT_ID');
}
```

## Reporting

### Weekly Report:
- Total users
- Traffic sources
- Top pages
- Conversion rate
- Revenue

### Monthly Report:
- User trends
- Engagement metrics
- Customer journey
- ROI analysis
- Recommendations

---

**Next Steps**: Implement Google Analytics and begin collecting data for insights.