# Generated by Django 5.0.1 on 2024-03-27 16:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API_DATABASE_REQUESTS', '0006_alter_warehouse_num_products'),
    ]

    operations = [
        migrations.RenameField(
            model_name='car',
            old_name='model',
            new_name='name',
        ),
        migrations.AlterField(
            model_name='car',
            name='registration_number',
            field=models.CharField(max_length=50),
        ),
    ]