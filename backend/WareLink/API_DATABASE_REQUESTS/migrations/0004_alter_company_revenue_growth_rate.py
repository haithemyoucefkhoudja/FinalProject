# Generated by Django 5.0.1 on 2024-03-20 22:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API_DATABASE_REQUESTS', '0003_company_num_employees_alter_company_num_warehouses'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='revenue_growth_rate',
            field=models.IntegerField(default=0),
        ),
    ]
