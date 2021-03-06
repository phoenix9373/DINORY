# Generated by Django 3.1.7 on 2021-03-25 07:45

from django.db import migrations, models
import imagekit.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('Notes', '0021_auto_20210325_1224'),
    ]

    operations = [
        migrations.AlterField(
            model_name='diary',
            name='img',
            field=imagekit.models.fields.ProcessedImageField(upload_to='images/%Y/%m/%d'),
        ),
        migrations.AlterField(
            model_name='note',
            name='img',
            field=models.CharField(max_length=255),
        ),
    ]
