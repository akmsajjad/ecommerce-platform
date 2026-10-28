from django.db import models
from django.conf import settings


class DashboardMetric(models.Model):
    date = models.DateField()
    total_sales = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total_orders = models.IntegerField(default=0)
    total_customers = models.IntegerField(default=0)
    total_revenue = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    class Meta:
        db_table = 'analytics_dashboardmetric'
        ordering = ['-date']
        unique_together = ['date']

    def __str__(self):
        return f'{self.date} - ৳{self.total_revenue}'


class SalesSummary(models.Model):
    period = models.CharField(max_length=20)
    start_date = models.DateField()
    end_date = models.DateField()
    total_sales = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total_orders = models.IntegerField(default=0)
    avg_order_value = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'analytics_salessummary'