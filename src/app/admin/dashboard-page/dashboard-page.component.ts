import {Component, OnDestroy, OnInit} from '@angular/core'
import {PostsService} from '../../shared/posts.service'
import {Post} from '../../shared/interfaces'
import {Subscription} from 'rxjs'
import {AlertServices} from '../shared/services/alert.services'

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  searchStr = ''
  posts: Post[] = []
  pSub: Subscription
  dSub: Subscription

  constructor(
    private postsService: PostsService,
    private alert: AlertServices
  ) { }

  ngOnInit() {
    this.pSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts
    })
  }

  remove(id: string) {
    this.dSub =  this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)
      this.alert.warning('Пост был удален')
    })
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }

    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }

}
