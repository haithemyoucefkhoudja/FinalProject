# Generated by Django 5.0.1 on 2024-03-31 02:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API_DATABASE_REQUESTS', '0011_product_type_is_deleted'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='price_per_unit',
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='quantity_warning_limit',
            field=models.IntegerField(default=100, null=True),
        ),
    ]