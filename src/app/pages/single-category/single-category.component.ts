import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit{

  constructor(private postService: PostsService, private route: ActivatedRoute) { }

  categoryPosts: Array<any>
  categoryData: any

  ngOnInit(): void {
    this.route.params.subscribe(val => { 
      // console.log(val);
      this.categoryData = val
      this.postService.loadCategoryData(val['id']).subscribe(post => { 
        this.categoryPosts = post
      })
      console.log(this.categoryPosts)
    })
  }



}
