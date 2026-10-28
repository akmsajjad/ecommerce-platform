from django.contrib import admin
from .models import DashboardMetric, SalesSummary


@admin.register(DashboardMetric)
class DashboardMetricAdmin(admin.ModelAdmin):
    list_display = ['date', 'total_sales', 'total_orders', 'total_customers', 'total_revenue']
    list_filter = ['date']


@admin.register(SalesSummary)
class SalesSummaryAdmin(admin.ModelAdmin):
    list_display = ['period', 'start_date', 'end_date', 'total_sales', 'total_orders', 'avg_order_value']