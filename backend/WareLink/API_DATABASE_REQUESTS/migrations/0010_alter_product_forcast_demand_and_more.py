# Generated by Django 5.0.1 on 2024-03-30 04:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API_DATABASE_REQUESTS', '0009_product_type_company_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='forcast_demand',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='intelligant_repelnishement',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='price_per_unit',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='product',
            name='quantity',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='product',
            name='quantity_warning_limit',
            field=models.IntegerField(default=100),
        ),
    ]